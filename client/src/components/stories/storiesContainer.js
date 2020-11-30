import React, {Component} from "react";
import {connect} from "react-redux";
import {
    getVocabforStory,
    initStory,
    leaveStories,
    resetSTories,
    enableLoading,
    disableLoading,
    saveHypothesisLink
} from '../../actions/stories';
import {endGrammarSearchSession} from '../../actions/analytics'

import {
    getListOfSavedWords,
    getListOfSavedGrammars,
    getSavedWords,
    enableSideBarButton,
    resetSideBar,
    updateSavedWords,
    addSavedGrammar,
    deleteSavedGrammar
} from "../../actions/sideBar";
import {disableSideBarButton} from '../../actions/dashboard';
import './styles/stories.css';
import Story from './components/story';
import SideBar from '../common/sideBar/sideBarContainer'
import {ClipLoader} from 'react-spinners';
import Modal from '@material-ui/core/Modal'
import FlashCardsContainer from './components/common/FlashCard/FlashCardsContainer';
import OriginalText from './components/common/OriginalText/OriginalTextContainer';
import LinearProgress from '@material-ui/core/LinearProgress';

class StoriesContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            applicationDescription: "",
            storyTitle: "",
            selectedLanguage: "",
            storyInfo: null,
            showModal: false,
            isSpeedDialOpen: false,
            modalComponent: "",
            savedVocabs: [],
            savedGrammars: [],
            openFiltered: false,
            flashCardType: "voc"
        }
        this.handleTranslate.bind(this)
        this.handleFlashCards.bind(this)
        this.handleOriginalText.bind(this)
    }


    componentWillMount() {
        this.props.enableLoading();
        const search = this.props.location.search;

        const params = new URLSearchParams(search);
        const storyTitle = params.get('storyTitle'); // bar
        this.setState({
            storyTitle,
        })
    }

    componentDidMount() {
        let iframes = [].slice.apply(document.querySelectorAll('iframe'));
        for (let anIframe of iframes) {
            if (anIframe.src.startsWith("https://hypothes.is")) {
                anIframe.src = anIframe.src.split("&")[0]
            }
        }
        let storyInfo;
        this.props.initStory(this.state.storyTitle).then(resp => {
            storyInfo = resp.storyInfo
            this.props.getListOfSavedWords(this.props.userId, storyInfo._id).then(resp => {
                this.setState({
                    savedVocabs: resp.savedVocabIds
                });
                this.props.enableSideBarButton();
                this.props.getSavedWords(this.props.userId, storyInfo._id, resp.savedVocabIds, this.props.stories.selectedLanguage).then(resp => {
                    this.props.disableLoading();
                    this.setState({
                        selectedLanguage: this.props.stories.selectedLanguage
                    })

                });
            })
            this.props.getListOfSavedGrammars(this.props.userId, storyInfo._id).then(resp => {
                this.setState({
                    savedGrammars: resp.savedGrammarIds
                });
            });
        });
    }

    handleTranslate = (language) => {
        this.setState({
            selectedLanguage: language,
            isSpeedDialOpen: false
        })
    }

    handleOpenSpeedDial = () => {
        this.setState({
            isSpeedDialOpen: true
        })
    }

    handleCloseSpeedDial = () => {
        this.setState({
            isSpeedDialOpen: false
        })
    }

    handleFlashCards = (isFiltered) => {
        this.setState({
            showModal: true,
            isSpeedDialOpen: false,
            modalComponent: 'FlashCards',
            openFiltered: isFiltered
        })
    }

    handleVocFlashCardSave = (vocab) => {
        let temp = this.state.savedVocabs;
        temp.push(vocab);
        this.setState({
            savedVocabs: temp
        })
        let params = {
            userId: this.props.userId,
            storyId: this.props.stories.storyInfo._id,
            savedVocabIds: temp,
            savedWords: this.props.sideBar.savedWords
        }
        this.props.updateSavedWords(params);
    }

    handleVocFlashCardUnsave = (vocab) => {
        let temp = this.state.savedVocabs;
        let tempList = temp.filter(e => e !== vocab);
        this.setState({
            savedVocabs: tempList
        })
        let params = {
            userId: this.props.userId,
            storyId: this.props.stories.storyInfo._id,
            savedVocabIds: tempList,
            savedWords: this.props.sideBar.savedWords
        }
        this.props.updateSavedWords(params);
    }

    setFlashCardType = (type) => {
        // type is either "voc" or "gram"
        this.setState({
            flashCardType: type
        })
    };

    handleGramFlashCardSave = (grammarId) => {
        let temp = this.state.savedGrammars;
        temp.push(grammarId);
        this.setState({
            savedGrammars: temp
        });
        this.props.addSavedGrammar(this.props.userId, this.props.stories.storyInfo._id, temp, this.props.stories[this.state.selectedLanguage].grammarList);
    };

    handleGramFlashCardUnsave = (grammarId) => {
        let temp = this.state.savedGrammars;
        let tempList = temp.filter(e => e !== grammarId);
        this.setState({
            savedGrammars: tempList
        });
        this.props.deleteSavedGrammar(this.props.userId, this.props.stories.storyInfo._id, tempList);
    };

    handleOriginalText = () => {
        this.setState({
            showModal: true,
            isSpeedDialOpen: false,
            modalComponent: 'OriginalText'
        })
    }


    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    componentWillUnmount() {
        let iframes = [].slice.apply(document.querySelectorAll('iframe'));
        let hypothesisURL = "";
        for (let anIframe of iframes) {
            if (anIframe.src.startsWith("https://hypothes.is")) {
                anIframe.src = anIframe.src.split("&")[0]
            }
        }
        //if(this.props.analytics.sessions.length > 0)this.props.endGrammarSearchSession();
        this.props.leaveStories();
        this.props.resetSTories(hypothesisURL.split("&")[0] + `&${Math.floor(Math.random() * 100000)}`);
        this.props.resetSideBar();
        this.props.disableSideBarButton();
    }

    render() {
        const {sideBar, stories} = this.props;
        let iframes = [].slice.apply(document.querySelectorAll('iframe'));
        for (let anIframe of iframes) {
            if (anIframe.src.startsWith("https://hypothes.is")) {
                anIframe.src += "&";
                anIframe.src = anIframe.src.split("&")[0]
            }
        }
        let text;
        let vocab;
        let grammar;
        let searchWord = this.props.searchVocab.highlightedWord;
        let title = "";
        let author = "";

        if (stories[this.state.selectedLanguage]) {
            text = stories[this.state.selectedLanguage].storyText
            vocab = stories[this.state.selectedLanguage].vocabList;
            grammar = stories[this.state.selectedLanguage].grammarList;
            switch (this.state.selectedLanguage) {
                case 'MODKR':
                    title = stories.storyInfo.titleKorn;
                    author = stories.storyInfo.authorKorn;
                    break;
                case 'ENGSH':
                    title = stories.storyInfo.titleEng
                    author = stories.storyInfo.authorRom
                    break;
                case 'MIDKR':
                    title = stories.storyInfo.titleKorn
                    author = stories.storyInfo.authorKorn
                    break;
                default:
                    title = stories.storyInfo.titleKorn
                    author = stories.storyInfo.authorKorn
            }
        }
        let modalComponent = null
        switch (this.state.modalComponent) {
            case 'FlashCards':
                modalComponent = <FlashCardsContainer savedVocabList={this.state.savedVocabs} vocabList={this.props.stories.MODKR.vocabList} storyTitle={this.state.storyTitle} cookies={this.props.cookies}
                                  handleVocSave={this.handleVocFlashCardSave} handleVocUnsave={this.handleVocFlashCardUnsave} openFiltered={this.state.openFiltered} setFlashCardType={this.setFlashCardType}
                                    flashCardType={this.state.flashCardType} handleGramSave={this.handleGramFlashCardSave} handleGramUnsave={this.handleGramFlashCardUnsave} grammarList={this.props.stories.MODKR.grammarList}
                                      savedGrammarList={this.state.savedGrammars}/>
                break;
            case 'OriginalText':
                modalComponent = <OriginalText url={this.props.stories.storyInfo.pdfUrl}
                                               selectedPages={this.props.stories.storyInfo.pagesSelected}/>
                break;
            default:
        }

        return (
            stories[this.state.selectedLanguage] ?
                <div className={'story-container'}>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.showModal}
                        onClose={this.handleClose}
                    >
                        {modalComponent}
                    </Modal>

                    <div style={{top: "40vh", left: "45%", position: "absolute", display: "flex"}}>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={150}
                            color={'#36D7B7'}
                            loading={this.props.stories.isStoryLoading}
                        />
                    </div>
                    <div>
                        {this.props.stories.storyInfo ?
                            <SideBar vocab={vocab} grammar={grammar} story={stories.storyTitle}
                                     onResize={this.onResize}/> : null
                        }
                    </div>
                    {stories.storyInfo ?
                        <Story title={title}
                               author={author}
                               text={text}
                               searchWord={searchWord}
                               sideBar={sideBar}
                               language={this.state.selectedLanguage}
                               handleTranslate={this.handleTranslate}
                               handleFlashCards={this.handleFlashCards}
                               handleOriginalText={this.handleOriginalText}
                               stories={this.props.stories}
                        /> : null}
                </div>
                :
                <div style={{position: 'relative', padding: '17%'}}>
                    <h3 style={{position: 'absolute', top:'50%', left: '50%', transform: 'translate(-50%,-50%)'}}>Loading Story . . .</h3>
                    <LinearProgress style={{width: '50%', position: 'absolute', left: '50%', transform: 'translate(-50%,1500%)'}}/>
                </div>
        );
    }
}

const mapStateToProps = state => (
    {
        stories: state.stories,
        userId: state.auth.user.id,
        sideBar: state.sideBar,
        dashboard: state.dashboard,
        analytics: state.analytics,
        searchVocab: state.vocab
    }
)

const mapDispatchToProps = ({
    getVocabforStory, getListOfSavedWords, initStory,
    getSavedWords, leaveStories, enableSideBarButton, resetSTories, resetSideBar,
    disableSideBarButton, updateSavedWords, enableLoading, disableLoading, saveHypothesisLink,
    endGrammarSearchSession, getListOfSavedGrammars, addSavedGrammar, deleteSavedGrammar
})

export default connect(mapStateToProps, mapDispatchToProps)(StoriesContainer);