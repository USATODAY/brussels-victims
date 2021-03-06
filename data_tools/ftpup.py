# Copyright (c) 2011, Xabier (slok) Larrakoetxea
# Copyright (c) 2011, Iraide (Sharem) Diaz
#
# 3 clause/New BSD license:
#   opensource: http://www.opensource.org/licenses/BSD-3-Clause
#   wikipedia: http://en.wikipedia.org/wiki/BSD_licenses
#
#-----------------------------------------------------------------------
# This script  allows to upload to Fileserve with FTP various files at the same time
#
# Use:
#   python ./ftpFilserveUploader.py ./Downloads/xxx.y ./yyyy.z  /home/xxx/yyyy.zz
#
from ftplib import FTP
from slack_tools import slack_notify
import sys
import os

########### MODIFY ########################

USER = os.environ.get('FTP_USER', None)
PASS = os.environ.get('FTP_PASS', None)

########### MODIFY IF YOU WANT ############

SERVER = os.environ.get('FTP_SERVER', None)
PORT = 21
BINARY_STORE = True # if False then line store (not valid for binary files (videos, music, photos...))

###########################################

def print_line(result):
    print(result)

def connect_ftp():
    #Connect to the server
    ftp = FTP()
    ftp.connect(SERVER, PORT)
    ftp.login(USER, PASS)

    return ftp

def upload_file(ftp_connetion, upload_file_path):

    #Open the file
    try:
        upload_file = open(upload_file_path, 'r')

        #get the name
        path_split = upload_file_path.split('/')
        final_file_name = path_split[len(path_split)-1]

        #transfer the file
        print('Uploading ' + final_file_name + '...')

        if BINARY_STORE:
            ftp_connetion.storbinary('STOR '+ final_file_name, upload_file)
        else:
            #ftp_connetion.storlines('STOR ' + final_file_name, upload_file, print_line)
            ftp_connetion.storlines('STOR '+ final_file_name, upload_file)

        print('Upload finished.')

    except IOError:
        print ("No such file or directory... passing to next file")
