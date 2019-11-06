from flask import Blueprint, render_template, request, send_from_directory, send_file
from fileshare.libs.configurationMgr import ConfigurationMgr
from fileshare.api.libs.utils import jwt_validate, is_access_token_valid
from fileshare.api.libs.paths import make_abs_path_from_url

import magic
import jwt

site = Blueprint("site", __name__, template_folder="templates", static_folder="static", static_url_path="/site/static")


configuration = ConfigurationMgr()

mime = magic.Magic(mime=True)

@site.route('/')
def homepage():
    if configuration.config.get("ACCESS_PASSWORD"):
        if is_access_token_valid(request.cookies):
            return render_template("index.html")
        else:
            return render_template("password.html")
    else:
        return render_template("index.html")


@site.route('/', defaults={'path': ''})
@site.route('/<path:path>')
def files(path):
    try:
        if configuration.config.get("DETECT_FILE_MIME"):
            abs_path = make_abs_path_from_url(path, configuration.config.get("SHARED_DIR"))
            f_mime = mime.from_file(abs_path)
        if configuration.config.get("FILE_MIME"):
            f_mime = configuration.config.get("FILE_MIME")


        if configuration.config.get("ACCESS_PASSWORD"):
            if is_access_token_valid(request.cookies):
                return send_from_directory(configuration.config.get("SHARED_DIR"), path, mimetype=f_mime)
            else:
                return render_template("password.html")
        return send_from_directory(configuration.config.get("SHARED_DIR"), path, mimetype=f_mime, as_attachment=True) 
    except (PermissionError, FileNotFoundError):
        return render_template("error/404.html")
