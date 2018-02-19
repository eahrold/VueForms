import _ from 'lodash'

export const image = [
    "image/*",
]

export const audio = [
        "audio/*",
        'application/ogg'
]

export const video = [
        "video/*",
        'application/ogg'
]

export const media = _.uniq(_.concat(image, audio, video))

export const documents = [
    "text/plain",
    "application/pdf",
    "application/xls",
    "application/excel",
    "application/vnd.ms-excel",
    "application/vnd.ms-excel; charset=binary",
    "application/msexcel",
    "application/x-excel",
    "application/x-msexcel",
    "application/x-ms-excel",
    "application/x-dos_ms_excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/docx",
    "application/msword",
    "application/vnd.ms-powerpoint",
]

export const any = _.uniq(_.concat(media, documents))

export default {
    image,
    media,
    documents,
    any
};