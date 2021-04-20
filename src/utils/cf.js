const request = require('request')
const fs = require('fs')


const query = (cid=1470,usr="tourist",callback) =>{
    const url = 'https://codeforces.com/api/contest.standings?contestId='+ cid +'&handles=' + usr
    request({ url: url }, (e, r) => {
        if(e)
        {
            callback(e,undefined)
        }
        else{
            const data = JSON.parse(r.body)
            if(data.status==="FAILED")
            {
                callback(data,undefined)
            }
            else
            {
                let out = {cname:data.result.contest.name}
                data.result.rows.forEach(e => {
                    
                }) 
                if(data.result.rows.length==0)
                {
                    out.usr=usr
                    out.rank = "-"
                }
                else{
                    out.usr = data.result.rows[0].party.members[0].handle
                    out.rank = data.result.rows[0].rank
                }
                callback(undefined,out)
            }
        }
    })
}

module.exports = {
    query
}