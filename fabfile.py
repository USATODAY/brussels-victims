from data_tools.updatedata import get_data
from data_tools.formatdata import format_data
from data_tools.slack_tools import slack_notify
from fabric.operations import local as run
from data_tools.ftpup import connect_ftp, upload_file
import os

slack_channel = "@mitchthorson"

def create_absolute_path(relative_path):
    return os.path.join(os.path.dirname(__file__), relative_path)

master_spreadsheet = create_absolute_path('data_tools/src/data.xlsx')
data_csv = create_absolute_path('data_tools/src/data.csv') 
data_json = create_absolute_path('data_tools/src/data.json') 

filter_csv = create_absolute_path('data_tools/src/filters.csv') 
filter_json = create_absolute_path('data_tools/src/filters.json') 

copy_csv = create_absolute_path('data_tools/src/copy.csv') 
copy_json = create_absolute_path('data_tools/src/copy.json') 

shows_csv = create_absolute_path('data_tools/src/shows.csv')
shows_json = create_absolute_path('data_tools/src/shows.json') 

def updater(target="dev"):
    print ("Downloading new data file from Google...")
    try:
        get_data()
    except:
        slack_notify("Hello, I had a problem downloading the Sunday Talk show spreadsheet from Google.", slack_channel)
        raise
    print ("Converting to JSON...")
    # remove files if they already exist
    try:
        run("rm %s" % (data_json))
    except:
        pass
    try:
        run("rm %s" % (data_csv))
    except:
        pass
    try:
        run("rm %s" % (filter_json))
    except:
        pass
    try:
        run("rm %s" % (filter_csv))
    except:
        pass
    try:
        run("rm %s" % (copy_csv))
    except:
        pass
    try:
        run("rm %s" % (copy_json))
    except:
        pass
    # convert excel sheet into 3 CSVs
    try:
        run ("in2csv %s --sheet Sheet1 > %s" % (master_spreadsheet, data_csv))
        run ("in2csv %s --sheet filters > %s" % (master_spreadsheet, filter_csv))
        run ("in2csv %s --sheet copy > %s" % (master_spreadsheet, copy_csv))
        run ("in2csv %s --sheet shows > %s" % (master_spreadsheet, shows_csv))
        run("csvjson %s > %s" % (data_csv, data_json))
        run("csvjson %s > %s" % (filter_csv, filter_json))
        run("csvjson %s > %s" % (copy_csv, copy_json))
        run("csvjson %s > %s" % (shows_csv, shows_json))
    except:
        slack_notify("Hello, I was unable to convert the latest sunday talk show data correctly.", slack_channel)
        raise
    print("Formatting data...")
    try:
        format_data()
    except:
        slack_notify("Hello, I was unable to format the latest data file correctly.", slack_channel)
        raise
    print("Uploading data...")
    try:
        ftp_conn = connect_ftp()
        ftp_conn.cwd("usatoday/2015/03/sunday-shows/data/")
        upload_file(ftp_conn, create_absolute_path('data_tools/output/data.json'))
        slack_notify("Hello! The Sunday Talk Show interactive data has been updated successfully.", slack_channel)
    except:
        slack_notify("I had a problem uploading the new data to the server.", slack_channel)

