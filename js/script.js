class Book {
	constructor(src, author, price) {
		this.src = src;
    this.author = author;
    this.price = price;
    this.page = 1;
		this.numberOfPage = [];
		this.initLetters()
		this.rendering();
    this.saveText();
    this.unitedFunction();
  }

  getUsers() {
    return fetch(this.src).then(res => {
          return res.json();
      }).then(item => {
          return (item.data[2].name);  
          
      })
      .catch(err => {
          console.log('Cant find users', err);
      })
    }

  author() {
		return this.author;
  }
  
	price() {
		return this.price;
	}
  
	initLetters() {
		return (
			this.maxLetters = 600,
			this.lettersInBook = this.page * this.maxLetters,
			this.firstLetterInPage = this.lettersInBook - this.maxLetters)
  }
  
	async saveText() {
    if (this.src.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
      this.text = await this.getUsers();
    } else this.text = this.src;
    
    try {
      this.pageOfBook = [];
      if (this.text.length - this.firstLetterInPage >= this.maxLetters) {
        for (let i = this.firstLetterInPage; i < this.lettersInBook; i++) {
          this.pageOfBook.push(this.text[i]);
        }
      } else if (this.text.length - this.firstLetterInPage < this.maxLetters) {
        for (let i = this.firstLetterInPage; i < this.lettersInBook; i++) {
          this.pageOfBook.push(this.text[i]);
        }
      }
      this.numberOfPage.push(this.pageOfBook.join(``));
      this.page++;
      this.initLetters();
      if (this.numberOfPage.length < this.text.length / 600) {
        this.saveText();
      } else {
        this.page = 1;
        this.loadPage();
      }
    } catch(err) {
      console.error("Loading of text failed", err)
    }

	}

	startReading() {
    this.loadPage();
    this.page = 1;
    this.main.style.display = `block`;
    this.start.style.display = `none`;
    console.log(`Page: ` + this.page);
	}
	nextPage() {
		if (this.page < this.numberOfPage.length) {
			this.page++;
			localStorage.setItem(`Page number`, JSON.stringify(this.lastPage + 1));
			this.rendering();
		}
	}
	prevPage() {
		if (this.page > 1) {
			this.page--;
			localStorage.setItem(`Page number`, JSON.stringify(this.lastPage - 1));
			this.rendering();
		}
  }
  
	jumpTo(number) {
		this.page = number;
		this.rendering();
  }

  continue() {
		this.jumpTo(JSON.parse(localStorage.getItem(`Page number`)));
		this.rendering();
	}
  
	find(searchElement) {
		this.result = [];
		let idx  = this.text.indexOf(searchElement);
		while (idx  !== -1) {
		  this.findPage = this.numberOfPage.map(item => item.split(` `).filter(element => {
        if (element === searchElement) {
          this.result.push([element + ` is on page number: ` + (this.numberOfPage.indexOf(item) + 1) + ` ;`]);
          }
    }));
		idx = this.text.indexOf(searchElement, idx + 1);
    }
    return this.result.join(` `);
  }

  createButtons() {
    this.container = document.querySelector(`.container`);
		this.nextBtn = document.querySelector(`.buttonNext`);
		this.prevBtn = document.querySelector(`.buttonPrev`);
		this.pageNumber = document.querySelector(`.pageNumber`);
		this.pageNumber.textContent = `Page: ${this.page}`;
    this.jump = document.querySelector(`.jump`);
    this.authorBtn = document.querySelector(`.author`);
    this.authorBtn.textContent = `Author: ${this.author}`;
    this.priceBtn = document.querySelector(`.price`);
    this.priceBtn.textContent = `Price: ${this.price}`;
    this.main = document.querySelector(`.main`);
    this.start = document.querySelector(`.start`);
  }

  unitedFunction(){
    this.nextBtn.addEventListener(`click`, () => this.nextPage());
		this.prevBtn.addEventListener(`click`, () => this.prevPage());
    this.jump.addEventListener(`change`, () => this.jumpTo(this.jump.value));
    this.start.addEventListener(`click`, () => this.startReading())
  }

  loadPage() {
		this.container.innerHTML = this.numberOfPage[this.page - 1] + `<h2>To use methods find() and continue() go to console.</h2>`;
		this.lastPage = this.page;
  }
  
	rendering() {
    this.createButtons();
		this.loadPage();
	}
}

const myBook1 = new Book(`Anyone who reads Old and Middle English literary texts will be familiar with the mid-brown volumes of the EETS, with the symbol of Alfred's jewel embossed on the front cover. Most of the works attributed to King Alfred or to Aelfric, along with some of those by bishop Wulfstan and much anonymous prose and verse from the pre-Conquest period, are to be found within the Society's three series; all of the surviving medieval drama, most of the Middle English romances, much religious and secular prose and verse including the English works of John Gower, Thomas Hoccleve and most of Caxton's prints all find their place in the publications. Without EETS editions, study of medieval English texts would hardly be possible.

As its name states, EETS was begun as a 'club', and it retains certain features of that even now. It has no physical location, or even office, no paid staff or editors, but books in the Original Series are published in the first place to satisfy subscriptions paid by individuals or institutions. This means that there is need for a regular sequence of new editions, normally one or two per year; achieving that sequence can pose problems for the Editorial Secretary, who may have too few or too many texts ready for publication at any one time. Details on a separate sheet explain how individual (but not institutional) members can choose to take certain back volumes in place of the newly published volumes against their subscriptions. On the same sheet are given details about the very advantageous discount available to individual members on all back numbers. In 1970 a Supplementary Series was begun, a series which only appears occasionally (it currently has 24 volumes within it); some of these are new editions of texts earlier appearing in the main series. Again these volumes are available at publication and later at a substantial discount to members. All these advantages can only be obtained through the Membership Secretary (the books are sent by post); they are not available through bookshops, and such bookstores as carry EETS books have only a very limited selection of the many published.

Editors, who receive no royalties or expenses and who are only very rarely commissioned by the Society, are encouraged to approach the Editorial Secretary with a detailed proposal of the text they wish to suggest to the Society early in their work; interest may be expressed at that point, but before any text is accepted for publication the final typescript must be approved by the Council (a body of some twenty scholars), and then assigned a place in the printing schedule. The Society now has a stylesheet to guide editors in the layout and conventions acceptable within its series. No prescriptive set of editorial principles is laid down, but it is usually expected that the evidence of all relevant medieval copies of the text(s) in question will have been considered, and that the texts edited will be complete whatever their length. Editions are directed at a scholarly readership rather than a popular one; though they normally provide a glossary and notes, no translation is provided.

EETS was founded in 1864 by Frederick James Furnivall, with the help of Richard Morris, Walter Skeat, and others, to bring the mass of unprinted Early English literature within the reach of students. It was also intended to provide accurate texts from which the New (later Oxford) English Dictionary could quote; the ongoing work on the revision of that Dictionary is still heavily dependent on the Society's editions, as are the Middle English Dictionary and the Toronto Dictionary of Old English. In 1867 an Extra Series was started, intended to contain texts already printed but not in satisfactory or readily obtainable editions; this series was discontinued in 1921, and from then on all the Society's editions, apart from the handful in the Supplementary Series described above, were listed and numbered as part of the Original Series. In all the Society has now published some 475 volumes; all except for a very small number (mostly of editions superseded within the series) are available in print. The early history of the Society is only traceable in outline: no details about nineteenth-century membership are available, and the secretarial records of the early twentieth century were largely lost during the second world war. By the 1950s a very large number of the Society's editions were out of print, and finances allowed for only a very limited reprinting programme. Around 1970 an advantageous arrangement was agreed with an American reprint firm to make almost all the volumes available once more whilst maintaining the membership discounts. Though this arrangement was superseded towards the end of the twentieth century and the cost of reprinting has reverted to the Society, as a result of the effort then it has proved possible to keep the bulk of the list in print.

Many comparable societies, with different areas of interest, were founded in the nineteenth century (several of them also by Furnivall); not all have survived, and few have produced as many valuable volumes as EETS. The Society's success continues to depend very heavily on the loyalty of members, and especially on the energy and devotion of a series of scholars who have been involved with the administration of the Society - the amount of time and effort spent by those who over the years have filled the role of Editorial Secretary is immeasurable. Plans for publications for the coming years are well in hand: there are a number of important texts which should be published within the next five years. At present, notably because of the efforts of a series of Executive and Membership Secretaries, the Society's finances are in reasonable shape; but certain trends give concern to the Council. The Society's continuance is dependent on two factors: the first is obviously the supply of scholarly editions suitable to be included in its series; the second is on the maintenance of subscriptions and sales of volumes at a level which will cover the printing and distribution costs of the new and reprinted books. The normal copyright laws cover the Society's volumes. All enquiries about large scale reproduction, whether by photocopying or on the internet, should be directed to the Executive Secretary in the first instance. The Society's continued usefulness depends on its editors and on its ability to maintain its (re)printing programme - and that depends on those who traditionally have become members of the Society. We hope you will maintain your membership, and will encourage both the libraries you use and also other individuals to join. Membership conveys many benefits for you, and for the wider academic community concerned for the understanding of medieval texts.`, 
`Taras Haidar`, 300);

 // const myBook2 = new Book(`https://test-users-api.herokuapp.com/users/`, `Taras Haidar`, 200);
