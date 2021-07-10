import os
import magic
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'zip'}
ALLOWED_MIME_TYPES = {'application/zip', 'application/x-zip-compressed', 'application/x-zip'}


def zipfile_check(file):
    if '.' in file.filename:
        ext = file.filename.rsplit('.', 1)[1].lower()
    else:
        return False

    mime_type = magic.from_buffer(file.stream.read(), mime=True)
    if (
        mime_type in ALLOWED_MIME_TYPES and
        ext in ALLOWED_EXTENSIONS
    ):
        # move the cursor to the beginning
        file.stream.seek(0, 0)
        return True

    return False


def create_folder(email, upload_count):
    folder = os.path.join("upload", email, upload_count)
    os.makedirs(folder, exist_ok=True)
    return folder


def get_full_path(folder, file_name):
    return os.path.join(folder, secure_filename(file_name))
