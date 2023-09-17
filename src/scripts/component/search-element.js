class Hello extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  handleClick() {
    if (typeof this.onClick === 'function') {
      this.onClick();
    }
  }

  set clickHandler(handler) {
    this.onClick = handler;
  }

  get value() {
    return this.shadowDOM.querySelector('#searchField').value;
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
    .search {
      display: flex;
      align-items: center;
      flex-direction:row;
      justify-content:center;
    }
  
    #searchField {
      width:100%;
      padding: 10px;
      border: none;
      border-radius: 5px;
      margin-right: 10px;
    }

    #searchButton {
      padding: 10px 20px;
      background-color: #e74c3c;
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
    }

    @media screen and (max-width: 768px) {
      search{
        width:100vw;
      }
      
    }
    @media screen and (max-width: 480px) {
      .search{
        flex-direction:column;
      }
      
    }
    </style>`;

    this.shadowDOM.innerHTML += `
    <div class="search">
      <input placeholder="type food..." id="searchField" type="search">
      <button id="searchButton" type="submit" >Search</button>
    </div>
        `;
    this.buttonElement = this.shadowRoot.getElementById('searchButton');
    this.buttonElement.addEventListener('click', this.handleClick.bind(this));
  }
}

customElements.define('search-element', Hello);
