from gdocs import GoogleDoc

doc_1 = {
    "key": "1NQQAW6HFUirQqs-V2boh8o0utymc5P02Uki8LIF0W_8",
    "file_name": "data",
    "file_format": "xlsx"
}

def get_data():
    g = GoogleDoc(**doc_1)
    g.get_auth()
    g.get_document()
    
if __name__ == "__main__":
    get_data()
