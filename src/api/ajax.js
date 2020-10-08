import axios from 'axios'

export default function ajax(url='', data={}, type='GET') {
    if(type === 'GET') {
        let datastr = ''
        for (var key in data) {
            datastr+= key +'='+ data[key] +'&'
        }
        if (datastr !=='') {
            datastr = datastr.substr(0, datastr.length -1)
            url = url + "?" + datastr
        }
        return axios.get(url)
    } else {
        return axios.post(url, data)
    }
}