export const fileType = ['DocType', 'OtherType', 'PdfType', 'PptType', 'RarType', 'XlsType']
const typeName = ['word', '表格', 'pdf', '压缩包', 'ppt', '其他文件类型']

export const judgeFile = (fileName) => {
  let suffix = fileName.split('.')[fileName.split('.').length - 1]
  switch (suffix) {
    case 'pdf':
      return fileType[2];
    case 'doc':
      return fileType[0];
    case 'docx':
      return fileType[0];
    case 'ppt':
      return fileType[3];
    case 'pptx':
      return fileType[3];
    case 'rar':
      return fileType[4];
    case 'xls':
      return fileType[5];
    default:
      return fileType[1] 
  }
}

export const judgeTypeName = (name) => {
  return typeName[fileType.findIndex(el => el === name)]
}