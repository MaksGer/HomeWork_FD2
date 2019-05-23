export default class AppSerrvice {
    constructor(text) {
        this.text = text
    }

    log() {
        console.log('[App service]:', this.text)
    }
}