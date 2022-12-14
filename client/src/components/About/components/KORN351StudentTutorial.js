import React from "react";
import {
    Paper,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {withStyles} from "@material-ui/core/styles"
import './styles/studentTutorial.css'

function StudentTutorial() {

    const PurpleTextTypography = withStyles({
        root: {
            color: "#b17aef"
        }
    })(Typography);

    const WarningTextTypography = withStyles({
        root: {
            color: "#ef7e27"
        }
    })(Typography);

    return (
        <div className="student-tutorial">
            <div className="tutorial-heading" style={{marginBottom: '1%'}}>
                <div className="tutorial-heading-bg">
                    <h2 style={{fontWeight: 'bold'}}>KORN 351 Student User Guide</h2>
                    <p>Learn how to use Interline Reader</p>
                </div>
            </div>

            <Paper style={{padding: '10% 10% 10% 10%', height: '100%', boxShadow: 'none'}}>
                <div className="korn351-guide">
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>I. Register</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                Students are required to create a new account and log in to use Interline Reader.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>II. Dashboard</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary" display="block">
                                Students can navigate to four different pages from the Dashboard:
                                <br/>
                                <br/>
                                <b>Lessons :</b> All materials by Lesson
                                <br/>
                                <b>Quizzes :</b> Flash card decks for self-testing
                                <br/>
                                <b>?????? :</b> Dictionary for searching ?????? (based on ubccjk.com v.2)
                                <br/>
                                <b>From ?????? to ?????? : </b> Extra, advanced-level material irrelevant to KORN 351 course
                                materials (not currently available)
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '100%'}}>
                            <img src={require('./student-tutorial-assets/351-dashboard.png')}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>III. Lessons</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                Students can view all lesson materials. Upon choosing a lesson, the main text and select
                                example sentences with new ??????(???) will show. The side bar at the top left corner will
                                become clickable. Note that the side bar will be active only on this main text page.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                There are two tabs in the Side Bar:
                                <br/>
                                <br/>
                                <b>?????? : </b> <i>New Vocabulary from Main Text</i> and <i>New Vocabulary from Example
                                Sentences</i> sections for that lesson
                                <br/>
                                <b>?????? : </b> Online dictionary for searching Korean vocabulary and ??????
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '100%'}}>
                            <img src={require('./student-tutorial-assets/351-sidebar.png')}/>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                In the bottom right-hand corner, there are six different buttons for navigating
                                between different sections of the lesson:
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '100%'}}>
                            <img src={require('./student-tutorial-assets/351-story-buttons.png')}/>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                More about these buttons:
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 0 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                <b>i. ??? ??????</b>
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                Gives basic essential information for each new sinograph introduced in the lesson: ??????
                                (moniker and pronunciation); ??? (basic English gloss); ????????? (total number of strokes); ??????
                                (radical = semantic determinative); phonetic (phonetic determinative, if the sinograph
                                has one); radical + remainder stroke count.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 0 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                <b>ii. ??? ??????</b>
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                Same information as for ??? ??????, but for the new radicals introduced in the lesson.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 0 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                <b>iii. ??? ????????? ?????????</b>
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                Each card shows a detailed explanation of the new ?????? (radicals) to be learned for a
                                particular lesson. It shows the ??????, its ??????, English meaning, number of strokes, a brief
                                explanation, and (if the ?????? also happens to function as an independent ??????) examples of
                                ????????? (sinographic vocabulary) in which it occurs.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 0 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                <b>iv. About the New Phonetics</b>
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                Each card shows a phonetic determinative (hinting at the pronunciation) for those
                                sinographs that include one. Each card shows the shape of the Phonetic, the Korean
                                pronunciation(s) it can indicate, and a list of sinographs that incorporate the
                                phonetic.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 0 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                <b>v. Building Word Power with ??????</b>
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                Each new sinograph introduced in the lesson is listed. After basic information like the
                                ??? + ???, ?????? + additional stroke count, you will find a list of vocabulary items that
                                incorporate the sinograph. Binoms (compounds) in bold are vocabulary items for which you
                                have learned all the constituent sinographs. Each vocabulary item include includes a
                                link to ??????(??????) or example sentences showing their usage in context.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 0 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                <b>vi. ?????? Comb. [New ?????? Combos]</b>
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                The binoms (compound words) listed here are only those for which you have learned all of
                                the constituent sinographs. Each card shows the ????????? vocabulary item, its pronunciation
                                along with an indication of whether it collocates with ??????, and an English translation.
                                Each vocabulary item include includes a link to ??????(??????) or example sentences showing
                                their usage in context.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>IV. Quizzes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                Students can study by testing themselves with the flash card decks in the Quizzes page.
                                There are seven different categories of decks available:
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography color="textSecondary" style={{padding: '0 5% 0 5%'}}>
                                - New Characters
                                <br/>
                                - Radicals
                                <br/>
                                - Phonetics
                                <br/>
                                - New Combos Vocab Vocab (these are the words for which you have learned all the
                                constituent ?????????the number will grow with each lesson)
                                <br/>
                                - All Combos Vocab (these are the words for which you have learned just one of
                                the
                                constituent ?????????the number will grow with each lesson)
                                <br/>
                                - Practice Sentences
                                <br/>
                                - ?????? (Example Sentences)
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                Each category is sub-divided into lessons.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                Each Flash Card deck will save the location where the student left off previously,
                                and re-start from that card/location.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <WarningTextTypography>
                                If an instructor makes a change (i.e., adding or deleting a new
                                vocabulary/radical/phonetics/etc.) to any of the contents, the students must be
                                notified to either:
                                <br/>
                                - Delete all the cache/cookies for Interline Reader or,
                                <br/>
                                - Click on the ???Start Over??? button on the Flash Card deck which has been modified
                                <br/>
                                <br/>
                                Because the student???s place in a flash card deck is saved as a cookie, the deck will
                                not reflect the changes made by the instructor unless the deck is restarted or the
                                cookie is deleted.
                            </WarningTextTypography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <PurpleTextTypography>
                                There is an extra deck called ???Cumulative??? under <i>New Combos Vocab, All Combos
                                Vocab </i>
                                and <i>Practice Sentences</i> categories. This deck contains all materials from all
                                lessons covered up to the current lesson. Note that the lessons are ordered in the deck
                                and thus, the students can stop at a particular lesson if desired.
                            </PurpleTextTypography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>V. ??????</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                Students can easily search for a sinograph (??????) either by radical, ??????, or by lesson.
                                Note that this is an exact replica of the now more or less retired UBC CJK website (UBC
                                Chinese-Japanese-Korean Multimedia Dictionary):
                                <a href="http://www.ubccjk.com/"> http://www.ubccjk.com/</a>.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography color="secondary">
                                There are some data discrepancies between the old UBC CJK site and the textbook
                                materials reflected in the InterlineReader, and between the InterlineReader and the
                                Sino-Korean Companion textbook files (if you catch any, please alert us!).
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 0 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                <b>a. By Radical</b>
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                Two filters must be applied. The first filter is for selecting a radical. Students
                                can filter the radicals by number of strokes.
                                <br/>
                                <br/>
                                The second filter will show a list of characters that contain that particular
                                radical chosen in the first filter. Once a character is chosen, the character
                                detail/information will be displayed at the right.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '100%'}}>
                            <img src={require('./student-tutorial-assets/351-radical.png')}/>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 0 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                <b>b. By ??????</b>
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                Two filters must be applied. The first filter is for selecting a ?????? syllable, which
                                would be the ???/??? of the character the student is searching for.
                                <br/>
                                <br/>
                                The second filter will show a list of characters that has the ???/??? that was chosen
                                from the first filter. Once a character is selected, that character
                                detail/information will be displayed at the right.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '100%'}}>
                            <img src={require('./student-tutorial-assets/351-hangul.png')}/>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 0 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                <b>c. By Lesson</b>
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '90%'}}>
                            <Typography color="textSecondary">
                                All radicals, characters and phonetics relevant to a particular lesson will be displayed
                                on the left. Once a character is clicked, its details/information will be shown on the
                                right.
                                <br/>
                                To change the lesson, click on the dark blue button that has the lesson number on it
                                (e.g., ???Lesson 1???).
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails style={{padding: '0 5% 5% 5%', height: '100%'}}>
                            <img src={require('./student-tutorial-assets/351-lesson.png')}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>VI. From ?????? to ??????</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                Not relevant to KORN 351 (and under development).
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Paper>
        </div>
    )
}

export default StudentTutorial;
