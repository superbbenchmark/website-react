from marshmallow import fields, Schema, validates, ValidationError
from marshmallow.decorators import post_load
from marshmallow.validate import Length, OneOf, Range
from urllib.parse import urlparse

from utils import get_AOETime, get_uuid


class SubmissionSchema(Schema):
    submitName = fields.Str(required=True, validate=Length(max=60))
    modelURL = fields.Str(required=True)  # Not required
    modelDesc = fields.Str(required=True, validate=Length(max=300))
    stride = fields.Int(required=True, validate=Range(min=0, max=100))
    inputFormat = fields.Str(required=True, validate=Length(max=300))
    corpus = fields.Str(required=True, validate=Length(max=300))
    paramDesc = fields.Str(required=True, validate=Length(max=300))
    paramShared = fields.Str(required=True, validate=Length(max=300))
    fineTunedParam = fields.Str(
        required=True, validate=Length(max=100))  # Not required
    taskSpecParam = fields.Str(
        required=True,  validate=Length(max=100))  # Not required
    task = fields.Str(required=True, validate=OneOf(["1", "2", "3"]))

    @validates("modelURL")
    def isGithubURL(self, url):
        if url != "" and urlparse(url).netloc != "github.com":
            raise ValidationError("Invalid Github URL!")

    @validates("fineTunedParam")
    @validates("taskSpecParam")
    def isValidnumber(self, num):
        if num != "" and not num.isnumeric():
            raise ValidationError("Invalid Number!")

    @post_load
    def add_uuid(self, data, **kwargs):
        data["submitUUID"] = get_uuid()
        return data

    @post_load
    def add_aoetime(self, data, **kwargs):
        data["aoeTimeUpload"] = get_AOETime()
        return data
