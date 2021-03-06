# TODO: Add Realtime update mode by not storing file in a database but instead, query it on request
# May require a separate branch
class DeleteMode:
    DELETE_BOTH_FILE_AND_ENTRY = 1
    DELETE_DATABASE_ENTRY_ONLY = 2

class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///D:/PROG/fileshare-flask/test.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Suppress the overhead warning, set to true if needed

    SHARED_DIRECTORY = [""]
    # List of directory to be shared, use absolute path

    ARCHIVE_STOREAGE_DIRECTORY = None

    SECURE_UPLOAD_FILENAME = True
    # bool, True werkzeug.secure_filename will be called on the uploaded file name
    # It is strongly advised to set this option to true as it's only way to prevent malicious path names being used

    DELETE_MODE = DeleteMode.DELETE_DATABASE_ENTRY_ONLY
    # delete mode represents how is a file going to be deleted
    # 1 represents both the database record and the actual file is going to be removed
    # 2 Represents the file/folder's record is only going to be deleted from the database, not the filesystem

    # DEPRECATED
    # DETECT_FILE_MIME = True
    # True if you want the program to use "magic.Magic(mime=True).from_buffer()" to detect the file's mime type and serve accordingly
    # FILE_MIME = None
    #  Force to serve all files using this mime type, will override detect_file_mime

    # NOT IMPLEMENTED
    ACCESS_PASSWORD = None
    #  if you don't want a password then leave it as a false value
    ALLOW_ACCESS_TOKEN_AS_URL_PARAM = False
    #  bool, True if user can provide their AccessTokens (JWT) as a url paramater, useful for temporary access sharing
    ALLOW_USER_ISSUE_TOKEN = False
    #  bool, True if a user that is authorized can issue a AccessToken for sharing files/dir to other non authorized users
    #  This option requires allow_access_token_as_url_param to be true
    SHARE_FILE_AUTH_REQUIRED = False
    #  bool, cooprates with (allow_access_token_as_url_param, allow_user_issue_token)
    #  Only will be in effect if (allow_access_token_as_url_param, allow_user_issue_token) are true
    #  Only allows user who are logged in to issue a access token
    UPLOAD_AUTH_REQUIRED = True
    #  bool, True if login is required to upload a file
    MKDIR_AUTH_REQUIRED = True
    #  bool, True if login is required to make a new folder
    DELETE_AUTH_REQUIRED = True
    #  bool, True if login is required to delete a file/folder
    RENAME_AUTH_REQUIRED = True
    #  bool, True if login is required to rename a file/folder

    # Only will take effect if the server is directly runes from run.py
    LOCAL_BINDING_IP_ADDRESS = 'localhost'
    LOCAL_BINDING_PORT       = 8000

class ConfigTesting(Config):
    pass


class ConfigProduction(Config):
    pass
