from marshmallow import fields, Schema, validates, ValidationError
from marshmallow.decorators import post_load
from marshmallow.validate import Length, OneOf, Range
from urllib.parse import urlparse

from utils import get_AOETime, get_uuid


class SubmissionPublicSchema(Schema):
    submitName = fields.Str(required=True, validate=Length(max=60))
    modelURL = fields.Str(required=True)  # Not required
    modelDesc = fields.Str(required=True, validate=Length(max=300))
    stride = fields.Int(required=True, validate=Range(min=0, max=100))
    inputFormat = fields.Str(required=True, validate=Length(max=300))
    corpus = fields.Str(required=True, validate=Length(max=300))
    paramDesc = fields.Str(required=True, validate=Length(max=300))
    macs = fields.Str(required=True, validate=Length(max=300))
    macsShort = fields.Str(required=True, validate=Length(max=300))
    macsMedium = fields.Str(required=True, validate=Length(max=300))
    macsLong = fields.Str(required=True, validate=Length(max=300))
    macsLonger = fields.Str(required=True, validate=Length(max=300))
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

class SubmissionHiddenSchema(Schema):
    submitName = fields.Str(required=True, validate=Length(max=60))
    modelDesc = fields.Str(required=True, validate=Length(max=300))
    huggingfaceOrganizationName = fields.Str(required=True, validate=Length(max=300))
    huggingfaceRepoName = fields.Str(required=True, validate=Length(max=300))
    huggingfaceCommonHash = fields.Str(required=True, validate=Length(max=300))
    paramShared = fields.Str(required=True, validate=Length(max=300))
    task = fields.Str(required=True, validate=OneOf(["1", "2", "3"]))

    @post_load
    def add_uuid(self, data, **kwargs):
        data["submitUUID"] = get_uuid()
        return data

    @post_load
    def add_aoetime(self, data, **kwargs):
        data["aoeTimeUpload"] = get_AOETime()
        return data
