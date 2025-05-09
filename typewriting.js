class typeWriting {
  constructor(element, callback = null) {
    this.element = element;
    this.words = JSON.parse(element.getAttribute('data-words'));
    this.speed = parseInt(element.getAttribute('data-speed'), 10) || 100;
    this.delay = parseInt(element.getAttribute('data-delay'), 10) || 1000;
    this.pauseAfterLast = parseInt(element.getAttribute('data-lastdelay'), 10) || 5000;
    this.loop = element.getAttribute('data-loop');
    this.char = '';
    this.counter = 0;
    this.isDeleting = false;
    this.callback = callback;
    this.type();
  }

  type() {
    const index = this.counter % this.words.length;
    const fullWord = this.words[index];
    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
      this.char = fullWord.substring(0, this.char.length - 1);
    } else {
      this.char = fullWord.substring(0, this.char.length + 1);
    }

    this.element.innerHTML = `<span class="write">${this.char}</span><span class="blinking-cursor">|</span>`;

    if (!this.isDeleting && this.char === fullWord) {
      // Word is fully typed — pause
      if (this.counter === this.words.length - 1) {
        // Last word — long pause
        setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, this.pauseAfterLast);
        return;
      } else {
        setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, this.delay);
        return;
      }
    }

    if (this.isDeleting && this.char === '') {
      this.isDeleting = false;
      this.counter++;

      if (this.counter >= this.words.length) {
        // Finished all words — call callback
        if (this.callback) {
          return this.callback();
        }
        return;
      }
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}
