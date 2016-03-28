import xlrd
import json
import os
import datetime
from slack_tools import slack_notify

source_file = os.path.join(os.path.dirname(__file__), 'src/data.json')
filters_json = os.path.join(os.path.dirname(__file__), 'src/filters.json')
copy_json = os.path.join(os.path.dirname(__file__), 'src/copy.json')
shows_json = os.path.join(os.path.dirname(__file__), 'src/shows.json')
output_file = os.path.join(os.path.dirname(__file__), 'output/data.json') 


def check_last_week(appearance):
    date = appearance["DATE"]
    if date == "":
        return False
    date_array = date.split("-")
    appearance_date_obj = datetime.datetime(int(date_array[0]), int(date_array[1]), int(date_array[2]))
    current_date = datetime.datetime.today()
    delta = datetime.timedelta(current_date.weekday() + 1)
    last_sunday_date = current_date - delta
    # last_sunday_date = datetime.datetime(current_date.year, current_date.month, current_date.day - (current_date.weekday() + 1))
    if appearance_date_obj.year == last_sunday_date.year and appearance_date_obj.month == last_sunday_date.month and appearance_date_obj.day == last_sunday_date.day:
        return True
    else:
        return False

# create appearance entry function
def create_appearance_dict(appearance):
    dateStr = appearance["DATE"]
    try:
        year, month, day = dateStr.split("-")
    except:
        print "Error parsing dates for %s. Check formatting." % appearance["Guest"]
        raise

    new_appearance_dict = {
        "date": "%s/%s/%s" % (month, day, year),
        "party": appearance["Party"],
        "state": appearance["State"],
        "description": appearance["Description"]
    }

    try:
        is_last_week = check_last_week(appearance)
    except:
        slack_notify("FYI some dates may have errors...", "@mitchthorson")
        raise
        is_last_week = False

    if is_last_week == True:
        new_appearance_dict['last_week'] = True
    else:
        new_appearance_dict['last_week'] = False

    # check for which network the appearance was on
    if appearance["Fox"].lower().strip() == "x":
        new_appearance_dict["network"] = "Fox"
    elif appearance["ABC"].lower().strip() == "x":
        new_appearance_dict["network"] = "ABC"
    elif appearance["CBS"].lower().strip() == "x":
        new_appearance_dict["network"] = "CBS"
    elif appearance["NBC"].lower().strip() == "x":
        new_appearance_dict["network"] = "NBC"
    elif appearance["CNN"].lower().strip() == "x":
        new_appearance_dict["network"] = "CNN"
    elif appearance["Univision"].lower().strip() == "x":
        new_appearance_dict["network"] = "Univision"

    # check for other tags
    if appearance["House"].lower().strip() == "x":
        new_appearance_dict["category"] = "house"
    elif appearance["Senate"].lower().strip() == "x":
        new_appearance_dict["category"] = "senate"
    elif appearance["Other Political"].lower().strip() == "x":
        new_appearance_dict["category"] = "other_political"
    elif appearance["Admin."].lower().strip() == "x":
        new_appearance_dict["category"] = "admin"
    elif appearance["Journalist"].lower().strip() == "x":
        new_appearance_dict["category"] = "journalist"
    else:
        new_appearance_dict["category"] = "other"
    
    return new_appearance_dict

def create_tag_list(person_dict):
    new_tag_list = []
    if person_dict["party"] is not "":
        new_tag_list.append(person_dict["party"].lower())
    if person_dict["gender"] is not "":
        new_tag_list.append(person_dict["gender"].lower())
    if person_dict["race"] is not "":
        new_tag_list.append(person_dict["race"].lower())
        new_tag_list.append("other")
    for appearance in person_dict["appearances"]:
        if "category" in appearance.keys():
            new_tag_list.append(appearance["category"].lower())
    for appearance in person_dict["appearances"]:
        if "network" in appearance.keys():
            new_tag_list.append(appearance["network"].lower())

    return new_tag_list

def check_categories(appearance, person_dict):
    # check for boolean values on appearance
    if appearance["House"].lower() == "x":
        person_dict["category"] = "house"
    if appearance["Senate"].lower() == "x":
        person_dict["category"] = "senate"
    if appearance["Admin."].lower() == "x":
        person_dict["category"] = "admin"
    if appearance["Other Political"].lower() == "x":
        person_dict["category"] = "other_political"
    if appearance["Journalist"].lower() == "x":
        person_dict["category"] = "journalist"
    if appearance["Other"].lower() == "x":
        person_dict["category"] = "other"



def format_data():
    # Open the workbook
    # wb = xlrd.open_workbook(source_file)
    
    # Get the first sheet either by index or by name
    # sh = wb.sheet_by_index(0)
    
    json_file = open(source_file)
    # List to store a record of each appearance
    appearance_list = json.load(json_file)
    json_file.close()

    filter_file = open(filters_json)
    filter_list = json.load(filter_file)
    filter_file.close()
   
    # flatten filter list
    flat_filter_list = []
    for filter_item in filter_list:
        if not filter_item["filters"] == "":
            flat_filter_list.append(filter_item["filters"])

    copy_file = open(copy_json)
    copy_list = json.load(copy_file)
    copy_file.close()

    shows_file = open(shows_json)
    shows_list = json.load(shows_file)
    shows_file.close()
    shows_dict = {}

    for show in shows_list:
        shows_dict[show["network"]] = show["show_name"]
    
    # Add all appearances as dictionaries to the list
    #for rownum in range(1, sh.nrows):
    #  appearance = {}
    #  headers = sh.row_values(0)
    #  for colnum in range(sh.ncols):
    #    appearance[headers[colnum]] = sh.cell_value(rownum, colnum)
    #  appearance_list.append(appearance)

    # master list to hold people objects. Desired format is
    # {
    #     guest: string,
    #     party: string,
    #     state: string,
    #     race: string,
    #     gender: string,
    #     house: boolean,
    #     senate: boolean,
    #     admin: boolean,
    #     other_political: boolean,
    #     journalist: boolean,
    #     other: boolean,
    #     description: string,
    #     appearances: list of appearances in the format
    #         {
    #             date: 'string',
    #             network: 'string'
    #         },
    # }

    # use dictionary with named keys to check if person exists yet
    people_dict = {}


    for appearance in appearance_list:
        guest_name = appearance['Guest'].strip()
        if not guest_name == "":
            # check if person is already in our dict
            if not guest_name in people_dict.keys():
                #create person dict based on info
                new_person_dict = {
                    "guest": guest_name, 
                    "party": appearance["Party"],
                    "state": appearance["State"],
                    "race": appearance["Race"],
                    "gender": appearance["Gender"],
                    "description": appearance["Description"],
                    "last_week": False,
                    "last_week_appearances": [],
                    "total_appearances": 0,
                    "category": None
                }

                # fix gender to full words
                if new_person_dict["gender"].lower().strip() == "f":
                    new_person_dict["gender"] = "female"
                elif new_person_dict["gender"].lower().strip() == "m":
                    new_person_dict["gender"] = "male"

                check_categories(appearance, new_person_dict)

                new_person_dict["appearances"] = []

                new_appearance_dict = create_appearance_dict(appearance)

                # Increment total appearance number
                new_person_dict["total_appearances"] = new_person_dict["total_appearances"] + 1

                if new_appearance_dict["last_week"] == True:
                    new_person_dict["last_week"] = True
                    new_person_dict["last_week_appearances"].append(new_appearance_dict["network"])

                new_person_dict["appearances"].append(new_appearance_dict)

                #add them to the dict
                people_dict[guest_name] = new_person_dict
            
            # if person is already in the dictionary
            else:
                #create a new appearance dictionary
                new_appearance_dict = create_appearance_dict(appearance)
                
                # Increment total appearance number
                people_dict[guest_name]["total_appearances"] = people_dict[guest_name]["total_appearances"] + 1

                # Check categories o appearance and apply to person
                check_categories(appearance, people_dict[guest_name])

                # Update the person's description
                people_dict[guest_name]["description"] = appearance["Description"]

                if new_appearance_dict["last_week"] == True:
                    people_dict[guest_name]["last_week"] = True
                    people_dict[guest_name]["last_week_appearances"].append(new_appearance_dict["network"])

                #append it to the existing person appearance list
                people_dict[guest_name]["appearances"].append(new_appearance_dict)
            
            people_dict[guest_name]["tags"] = list(set(create_tag_list(people_dict[guest_name])))
        else:
            pass

    # now iterate over people dictionary and flatten into a list of people

    person_list = []

    for key, value in people_dict.iteritems():
        person_list.append(value)

    data_dict = {
        "people": person_list,
        "filters": flat_filter_list,
        "copy": copy_list[0],
        "shows": shows_dict
    }
    # save person list to json file

    with open(output_file, "w") as output:
        json.dump(data_dict, output)


if __name__ == "__main__":
    format_data()
