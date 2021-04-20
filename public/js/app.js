const cform = document.querySelector('form')
const usr = document.querySelector('#usr')
const cid = document.querySelector('#cid')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')
const m3 = document.querySelector('#m3')



cform.addEventListener('submit',(e)=>{
    e.preventDefault()
        m1.textContent = 'Loading...'
        m2.textContent = ''
        m3.textContent = ''
        fetch('/cfapi?cid=' + cid.value + '&usr=' + usr.value).then((response) =>{
        response.json().then((data) => {
            if(data.status)
            {
                m1.textContent = 'Error'
                m2.textContent = data.comment.split(";")[0]
                m3.textContent = data.comment.split(";")[1]
            }
            else
            {
                m1.textContent= 'Contest: ' + data.cname
                m2.textContent= 'Username: ' + data.usr
                m3.textContent= 'Rank: ' + data.rank
            }
        })
    })
})


