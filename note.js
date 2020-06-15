let noteTemplate = document.createElement('template')

noteTemplate.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.4/dist/css/uikit.min.css" />
    <link href="https://cdn.lineicons.com/2.0/LineIcons.css" rel="stylesheet">
    <style>
        .cursorPointer {
            cursor: pointer;
        }
        
        .lni-circle-plus {
            font-size: 25px !important;
        }
    </style>
    <div class="uk-card uk-card-default uk-card-body item uk-margin-bottom">
        <div class="uk-flex uk-flex-middle uk-flex-between">
            <p class="uk-margin-remove uk-text-meta" id="date"></p>
            <div>
                <i id="edit" class="lni lni-pencil-alt uk-margin-right cursorPointer uk-box-shadow-hover-large"></i>
                <i id="delete" class="lni lni-trash cursorPointer uk-box-shadow-hover-large"></i>
            </div>
        </div>
        <p contenteditable="false" id="text"></p>
    </div>
`

class Note extends HTMLDivElement {
    constructor () {
        super()
        this.attachShadow({ mode: 'open' }) 
        this.shadowRoot.appendChild(noteTemplate.content.cloneNode(true))
        this.id = ''
    }
    connectedCallback () {
        this.shadowRoot.querySelector('#date').innerText = this.getAttribute('date')
        this.shadowRoot.querySelector('#text').innerText = this.getAttribute('text')
        this.shadowRoot.querySelector('#text').addEventListener('blur', (e) => {
            this.confirmEdit(e)
        })
        this.shadowRoot.querySelector('#edit').addEventListener('click', this.editNote)
        this.shadowRoot.querySelector('#delete').addEventListener('click', this.deleteNote)
        this.id = this.getAttribute('id')
    }

    editNote = () => {
        this.shadowRoot.querySelector('#text').setAttribute('contenteditable', true)
        this.shadowRoot.querySelector('#text').focus()
        this.shadowRoot.querySelector('#edit').style.display = 'none'
    }

    confirmEdit = (e) => {
        let notes = JSON.parse(localStorage.getItem('notes'))
        e.target.setAttribute('contenteditable', false)
        this.shadowRoot.querySelector('#edit').style.display = 'inline-block'
        let noteIndex = notes.findIndex(item => item.id === this.id)
        if (noteIndex > -1) {
            notes[noteIndex].text = this.shadowRoot.querySelector('#text').innerText
            localStorage.setItem('notes', JSON.stringify(notes))
        }
    }

    deleteNote = () => {
        let notes = JSON.parse(localStorage.getItem('notes'))
        let noteIndex = notes.findIndex(item => item.id === this.id)
        if (noteIndex > -1) {
            notes.splice(noteIndex, 1)
            this.parentNode.removeChild(this)
            localStorage.setItem('notes', JSON.stringify(notes))
        }
        this.dispatchEvent(new CustomEvent('CHECK_NO_NOTE'))
    }

}

window.customElements.define('note-item', Note, { extends: "div" })