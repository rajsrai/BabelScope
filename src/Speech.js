'use strict'
import React, { Component } from "react";
import socketIO from 'socket.io-client'
import Select from 'react-select'
import RaisedButton from 'material-ui/RaisedButton';
import { REACT_APP_API_KEY } from '../credentials.js';





//------------------------SPEECH RECOGNITION-----------------------------

const SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'
const API_KEY = process.env.REACT_APP_API_KEY;
//------------------------LANGUAGES--------------------------------------
const options = [
  {
    value: "ab",
    label: "Abkhaz"
  },
  {
    value: "aa",
    label: "Afar"
  },
  {
    value: "af",
    label: "Afrikaans"
  },
  {
    value: "ak",
    label: "Akan"
  },
  {
    value: "sq",
    label: "Albanian"
  },
  {
    value: "am",
    label: "Amharic"
  },
  {
    value: "ar",
    label: "Arabic"
  },
  {
    value: "an",
    label: "Aragonese"
  },
  {
    value: "hy",
    label: "Armenian"
  },
  {
    value: "as",
    label: "Assamese"
  },
  {
    value: "av",
    label: "Avaric"
  },
  {
    value: "ae",
    label: "Avestan"
  },
  {
    value: "ay",
    label: "Aymara"
  },
  {
    value: "az",
    label: "Azerbaijani"
  },
  {
    value: "bm",
    label: "Bambara"
  },
  {
    value: "ba",
    label: "Bashkir"
  },
  {
    value: "eu",
    label: "Basque"
  },
  {
    value: "be",
    label: "Belarusian"
  },
  {
    value: "bn",
    label: "Bengali; Bangla"
  },
  {
    value: "bh",
    label: "Bihari"
  },
  {
    value: "bi",
    label: "Bislama"
  },
  {
    value: "bs",
    label: "Bosnian"
  },
  {
    value: "br",
    label: "Breton"
  },
  {
    value: "bg",
    label: "Bulgarian"
  },
  {
    value: "my",
    label: "Burmese"
  },
  {
    value: "ca",
    label: "Catalan; Valencian"
  },
  {
    value: "ch",
    label: "Chamorro"
  },
  {
    value: "ce",
    label: "Chechen"
  },
  {
    value: "ny",
    label: "Chichewa; Chewa; Nyanja"
  },
  {
    value: "zh",
    label: "Chinese"
  },
  {
    value: "cv",
    label: "Chuvash"
  },
  {
    value: "kw",
    label: "Cornish"
  },
  {
    value: "co",
    label: "Corsican"
  },
  {
    value: "cr",
    label: "Cree"
  },
  {
    value: "hr",
    label: "Croatian"
  },
  {
    value: "cs",
    label: "Czech"
  },
  {
    value: "da",
    label: "Danish"
  },
  {
    value: "dv",
    label: "Divehi; Dhivehi; Maldivian;"
  },
  {
    value: "nl",
    label: "Dutch"
  },
  {
    value: "dz",
    label: "Dzongkha"
  },
  {
    value: "en",
    label: "English"
  },
  {
    value: "eo",
    label: "Esperanto"
  },
  {
    value: "et",
    label: "Estonian"
  },
  {
    value: "ee",
    label: "Ewe"
  },
  {
    value: "fo",
    label: "Faroese"
  },
  {
    value: "fj",
    label: "Fijian"
  },
  {
    value: "fi",
    label: "Finnish"
  },
  {
    value: "fr",
    label: "French"
  },
  {
    value: "ff",
    label: "Fula; Fulah; Pulaar; Pular"
  },
  {
    value: "gl",
    label: "Galician"
  },
  {
    value: "ka",
    label: "Georgian"
  },
  {
    value: "de",
    label: "German"
  },
  {
    value: "el",
    label: "Greek, Modern"
  },
  {
    value: "gn",
    label: "GuaranÃ­"
  },
  {
    value: "gu",
    label: "Gujarati"
  },
  {
    value: "ht",
    label: "Haitian; Haitian Creole"
  },
  {
    value: "ha",
    label: "Hausa"
  },
  {
    value: "he",
    label: "Hebrew (modern)"
  },
  {
    value: "hz",
    label: "Herero"
  },
  {
    value: "hi",
    label: "Hindi"
  },
  {
    value: "ho",
    label: "Hiri Motu"
  },
  {
    value: "hu",
    label: "Hungarian"
  },
  {
    value: "ia",
    label: "Interlingua"
  },
  {
    value: "id",
    label: "Indonesian"
  },
  {
    value: "ie",
    label: "Interlingue"
  },
  {
    value: "ga",
    label: "Irish"
  },
  {
    value: "ig",
    label: "Igbo"
  },
  {
    value: "ik",
    label: "Inupiaq"
  },
  {
    value: "io",
    label: "Ido"
  },
  {
    value: "is",
    label: "Icelandic"
  },
  {
    value: "it",
    label: "Italian"
  },
  {
    value: "iu",
    label: "Inuktitut"
  },
  {
    value: "ja",
    label: "Japanese"
  },
  {
    value: "jv",
    label: "Javanese"
  },
  {
    value: "kl",
    label: "Kalaallisut, Greenlandic"
  },
  {
    value: "kn",
    label: "Kannada"
  },
  {
    value: "kr",
    label: "Kanuri"
  },
  {
    value: "ks",
    label: "Kashmiri"
  },
  {
    value: "kk",
    label: "Kazakh"
  },
  {
    value: "km",
    label: "Khmer"
  },
  {
    value: "ki",
    label: "Kikuyu, Gikuyu"
  },
  {
    value: "rw",
    label: "Kinyarwanda"
  },
  {
    value: "ky",
    label: "Kyrgyz"
  },
  {
    value: "kv",
    label: "Komi"
  },
  {
    value: "kg",
    label: "Kongo"
  },
  {
    value: "ko",
    label: "Korean"
  },
  {
    value: "ku",
    label: "Kurdish"
  },
  {
    value: "kj",
    label: "Kwanyama, Kuanyama"
  },
  {
    value: "la",
    label: "Latin"
  },
  {
    value: "lb",
    label: "Luxembourgish, Letzeburgesch"
  },
  {
    value: "lg",
    label: "Ganda"
  },
  {
    value: "li",
    label: "Limburgish, Limburgan, Limburger"
  },
  {
    value: "ln",
    label: "Lingala"
  },
  {
    value: "lo",
    label: "Lao"
  },
  {
    value: "lt",
    label: "Lithuanian"
  },
  {
    value: "lu",
    label: "Luba-Katanga"
  },
  {
    value: "lv",
    label: "Latvian"
  },
  {
    value: "gv",
    label: "Manx"
  },
  {
    value: "mk",
    label: "Macedonian"
  },
  {
    value: "mg",
    label: "Malagasy"
  },
  {
    value: "ms",
    label: "Malay"
  },
  {
    value: "ml",
    label: "Malayalam"
  },
  {
    value: "mt",
    label: "Maltese"
  },
  {
    value: "mi",
    label: "MÄori"
  },
  {
    value: "mr",
    label: "Marathi (MarÄá¹­hÄ«)"
  },
  {
    value: "mh",
    label: "Marshallese"
  },
  {
    value: "mn",
    label: "Mongolian"
  },
  {
    value: "na",
    label: "Nauru"
  },
  {
    value: "nv",
    label: "Navajo, Navaho"
  },
  {
    value: "nb",
    label: "Norwegian BokmÃ¥l"
  },
  {
    value: "nd",
    label: "North Ndebele"
  },
  {
    value: "ne",
    label: "Nepali"
  },
  {
    value: "ng",
    label: "Ndonga"
  },
  {
    value: "nn",
    label: "Norwegian Nynorsk"
  },
  {
    value: "no",
    label: "Norwegian"
  },
  {
    value: "ii",
    label: "Nuosu"
  },
  {
    value: "nr",
    label: "South Ndebele"
  },
  {
    value: "oc",
    label: "Occitan"
  },
  {
    value: "oj",
    label: "Ojibwe, Ojibwa"
  },
  {
    value: "cu",
    label: "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic"
  },
  {
    value: "om",
    label: "Oromo"
  },
  {
    value: "or",
    label: "Oriya"
  },
  {
    value: "os",
    label: "Ossetian, Ossetic"
  },
  {
    value: "pa",
    label: "Panjabi, Punjabi"
  },
  {
    value: "pi",
    label: "PÄli"
  },
  {
    value: "fa",
    label: "Persian (Farsi)"
  },
  {
    value: "pl",
    label: "Polish"
  },
  {
    value: "ps",
    label: "Pashto, Pushto"
  },
  {
    value: "pt",
    label: "Portuguese"
  },
  {
    value: "qu",
    label: "Quechua"
  },
  {
    value: "rm",
    label: "Romansh"
  },
  {
    value: "rn",
    label: "Kirundi"
  },
  {
    value: "ro",
    label: "Romanian, [])"
  },
  {
    value: "ru",
    label: "Russian"
  },
  {
    value: "sa",
    label: "Sanskrit (Saá¹ská¹›ta)"
  },
  {
    value: "sc",
    label: "Sardinian"
  },
  {
    value: "sd",
    label: "Sindhi"
  },
  {
    value: "se",
    label: "Northern Sami"
  },
  {
    value: "sm",
    label: "Samoan"
  },
  {
    value: "sg",
    label: "Sango"
  },
  {
    value: "sr",
    label: "Serbian"
  },
  {
    value: "gd",
    label: "Scottish Gaelic; Gaelic"
  },
  {
    value: "sn",
    label: "Shona"
  },
  {
    value: "si",
    label: "Sinhala, Sinhalese"
  },
  {
    value: "sk",
    label: "Slovak"
  },
  {
    value: "sl",
    label: "Slovene"
  },
  {
    value: "so",
    label: "Somali"
  },
  {
    value: "st",
    label: "Southern Sotho"
  },
  {
    value: "az",
    label: "South Azerbaijani"
  },
  {
    value: "es",
    label: "Spanish; Castilian"
  },
  {
    value: "su",
    label: "Sundanese"
  },
  {
    value: "sw",
    label: "Swahili"
  },
  {
    value: "ss",
    label: "Swati"
  },
  {
    value: "sv",
    label: "Swedish"
  },
  {
    value: "ta",
    label: "Tamil"
  },
  {
    value: "te",
    label: "Telugu"
  },
  {
    value: "tg",
    label: "Tajik"
  },
  {
    value: "th",
    label: "Thai"
  },
  {
    value: "ti",
    label: "Tigrinya"
  },
  {
    value: "bo",
    label: "Tibetan Standard, Tibetan, Central"
  },
  {
    value: "tk",
    label: "Turkmen"
  },
  {
    value: "tl",
    label: "Tagalog"
  },
  {
    value: "tn",
    label: "Tswana"
  },
  {
    value: "to",
    label: "Tonga (Tonga Islands)"
  },
  {
    value: "tr",
    label: "Turkish"
  },
  {
    value: "ts",
    label: "Tsonga"
  },
  {
    value: "tt",
    label: "Tatar"
  },
  {
    value: "tw",
    label: "Twi"
  },
  {
    value: "ty",
    label: "Tahitian"
  },
  {
    value: "ug",
    label: "Uyghur, Uighur"
  },
  {
    value: "uk",
    label: "Ukrainian"
  },
  {
    value: "ur",
    label: "Urdu"
  },
  {
    value: "uz",
    label: "Uzbek"
  },
  {
    value: "ve",
    label: "Venda"
  },
  {
    value: "vi",
    label: "Vietnamese"
  },
  {
    value: "vo",
    label: "VolapÃ¼k"
  },
  {
    value: "wa",
    label: "Walloon"
  },
  {
    value: "cy",
    label: "Welsh"
  },
  {
    value: "wo",
    label: "Wolof"
  },
  {
    value: "fy",
    label: "Western Frisian"
  },
  {
    value: "xh",
    label: "Xhosa"
  },
  {
    value: "yi",
    label: "Yiddish"
  },
  {
    value: "yo",
    label: "Yoruba"
  },
  {
    value: "za",
    label: "Zhuang, Chuang"
  },
  {
    value: "zu",
    label: "Zulu"
  }
]

//------------------------COMPONENT-----------------------------

class Speech extends Component {

  constructor() {
    super()
    this.state = {
      listening: false,
      value: '',
      selectedOption: null,
      beef: ""
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.io = socketIO('http://localhost:9000')
  }
  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption.value);
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

  handleListen () {

    console.log('listening?', this.state.listening)

    if (this.state.listening) {
      recognition.start()
      recognition.onend = () => {
        console.log("...continue listening...")
        recognition.start()
      }

    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log("Stopped listening per click")
      }
    }

    recognition.onstart = () => {
      console.log("Listening!")
    }


    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      let fromLang = 'en';
      let toLang = this.state.selectedOption.value
      // let text = 'something to translate';




      let url = `https://translation.googleapis.com/language/translate/v2?key=${REACT_APP_API_KEY}`;
      url += '&q=' + encodeURI(finalTranscript);
      url += `&source=${fromLang}`;
      url += `&target=${toLang}`;
      fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(res => res.json())
      .then((response) => {
        console.log("response from google: ", response);
        let finTranslation = response.data.translations[0].translatedText
        console.log(finTranslation)
        // document.getElementById('translation').innerHTML = finTranslation
        this.io.emit('giventranslation', finTranslation)
        console.log('is this working')
        this.io.on('whatever', (othertranslation) => {document.getElementById('othertranslation').innerHTML = othertranslation} )
// this.io.on('whatever', (othertranslation) => { this.setState({beef: othertranslation})})
      })
      .catch(error => {
        console.log("There was an error with the translation request: ", error);
      });
      document.getElementById('interim').innerHTML = interimTranscript
      document.getElementById('final').innerHTML = finalTranscript




    //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)

      if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText
          console.log(finalText)
          }

      }  // The target language
    }



  //-----------------------------------------------------------------------

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }

  }

  render() {
    const { selectedOption } = this.state;
    let translationButton = this.state.listening ? (
    <RaisedButton label="Listening" secondary={true} onClick={this.toggleListen} />
  ) : (
    <RaisedButton label="Translate" primary={true} onClick={this.toggleListen} />
  )
    return (
      <div>
      <div style={container}>
        {translationButton}
        <div id='interim' style={interim}></div>
        <div id='final' style={final}></div>
        <div id='translation' style={translation}></div>
        <div id='othertranslation' style={othertranslation}></div>
        </div>
        <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                placeholder={"Please select a language"}
          />
        </div>
    )
  }
}

export default Speech;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  button: {
    width: '60px',
    height: '60px',
    background: 'lightblue',
    borderRadius: '50%',
    margin: '6em 0 2em 0'
  },
  interim: {
    color: 'gray',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  },
  final: {
    color: 'black',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  },
  translation: {
    color: 'black',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  },
  othertranslation: {
    color: 'black',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  }
}



const { container, button, interim, final, translation, othertranslation } = styles
