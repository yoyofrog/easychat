export function getRedirect(type, header) {
    let path = '1'
    if ( type ==='laoban'){
        path ='/laoban'
    } else {
        path = '/dashen'
    }
    if (!header) {
        path += 'info'
    }
    return path
}