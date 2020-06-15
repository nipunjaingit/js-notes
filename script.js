let notesItem = document.getElementById('notesItem')
let addNoteButton = document.getElementById('addNote')

let notes = JSON.parse(localStorage.getItem('notes')) || []
let noNotes = document.getElementById('no-item')
if (notes.length > 0) {
    noNotes.style.display = 'none'
    notes.forEach(element => {
        let node = document.createElement('div', {is: 'note-item'})
        node.setAttribute('id', element.id)
        node.setAttribute('date', element.date)
        node.setAttribute('text', element.text)
        notesItem.appendChild(node)
    });
}

function checkNoNote () {
    if (JSON.parse(localStorage.getItem('notes')).length === 0) {
        noNotes.style.display = 'block'
    }
}

addNoteButton.addEventListener('click', () => {
    if (notes.length === 0) {
        noNotes.style.display = 'none'
    }
    let id = uuidv4()
    let date = new Date()
    notes.push({
        id: id,
        date: moment(date).format('LLL'),
        text: ''
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    console.log(JSON.parse(localStorage.getItem('notes')))
    let node = document.createElement('div', {is: 'note-item'})
    node.setAttribute('id', id)
    node.setAttribute('date', moment(date).format('LLL'))
    node.setAttribute('text', '')
    node.addEventListener('CHECK_NO_NOTE', () => {
        checkNoNote()
    })
    notesItem.appendChild(node)
})
