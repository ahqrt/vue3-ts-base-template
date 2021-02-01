export function verifyPermission(havePermissions: any, needPermissions: any) {
  // console.log('权限判断结果：',(permissions & needPermissions)==needPermissions)
  // return (permissions & needPermissions)==needPermissions
  for (const permission in needPermissions) {
    // console.log(needPermissions[permission],"是否在",havePermissions)
    const result = havePermissions.indexOf(needPermissions[permission])
    // console.log(result)
    if (result === -1) {
      return false
    }
  }
  return true
}
