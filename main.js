const textElement = document.getElementById('textBox');
const buttons = document.getElementById('buttonBox');

const audio = document.getElementById('myaudio');
audio.volume = 0.05;
const track1 = 'audio/unknown_space_ambience.mp3';
const track2 = 'audio/biohazardsv3.ogg';
const track3 = 'audio/biohazardsextended.ogg';
const track4 = 'audio/unknown_space_bassed.mp3';
let audioTest 

let playButton = document.getElementById("playbutton");

playButton.addEventListener("click", handlePlayButton, false);
playAudio();

async function playAudio() {
    try {
        await audio.play();
        playButton.classList.add("playing");
        audio.autoplay = true;
        playButton.innerText='🔉'
    } catch(err) {
        playButton.classList.remove("playing");
        audio.autoplay = false;
        playButton.innerText='🔇';
    }
}

function handlePlayButton() {
    state.play = 1;
    if (audio.paused) {
        playAudio();
    } else {
        audio.pause();
        playButton.classList.remove("playing");
        audio.autoplay = false;
        playButton.innerText='🔇';
    }
}


let state = {};

function startGame() {
    state = {
        lives: 3,
        play: 0,
    };
    audio.src = track1;
    showTextNode(1);
}

function showTextNode(textNodeIndex) {

    let textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    
    showImage(textNode);

    if (state.lives <= 0) {
        state.lives = 3;
        textNode = textNodes.find(textNode => textNode.id === 98);
        showImage(textNode);
        audio.src = track4;
    }

    
    textElement.innerHTML = textNode.text
    while (buttons.firstChild) {
    buttons.removeChild(buttons.firstChild)
    }
    textNode.options.forEach(option => {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        buttons.appendChild(button)
    })

}

function showImage(textNode) {

    const image = document.querySelector('#image');
    const sensor = 'images/shimmer.gif';
    const farm = 'images/craiyon_142642_robots_and_human_farmers_working_together_in_a_field__painting.png';
    const machines = 'images/craiyon_203314_3_machines_of_humanity__terrifying__retro_art.png';
    const initiare = 'images/craiyon_190639_The_machines_of_humanity_adore_humans__nbsp_.png';
    const destruction = 'images/craiyon_123831_the_destruction_of_a_futuristic_city.png';
    const rogue = 'images/rogue.gif';
    const rogueshift = 'images/rogueshift.gif';
    const selt = 'images/craiyon_154425_side_view_of_a_female_in_discreet_tactical_clothing_with_a_blond_ponytail__running_in.png'
    const soul = 'images/craiyon_194253_human_soul__retro_art.png'
    const rocket = 'images/craiyon_195113_sitting_in_a_field_watching_the_missiles_flying_towards_us.png'
    const bad = 'images/craiyon_012253_bad_ending__retro_art.png'
    const good = 'images/craiyon_194244_human_soul__retro_art.png'
    const best = 'images/craiyon_194430_soulless_human__retro_art.png'

    image.className = ''
    
    switch (textNode.mood){
        case 'neutral':
            image.classList.add("neutral")
            break;
        case 'mad':
            image.classList.add("mad")
            state.lives = (state.lives - 1);
            break;
        case 'glad':
            image.classList.add("glad")
            break;
        case 'craiyon':
            image.classList.add("craiyon")
            break;
        case 'clear':
            image.classList.add("clear")
            break;
        case 'shift':
            image.classList.add("shift")
            break;
        default:
            break;           
    }
    switch (textNode.img){
        case 'farm':
            image.src = farm;
            break;
        case 'machines':
            image.src = machines;
            break;
        case 'initiare':
            image.src = initiare;
            image.classList.add("angry")
            break;
        case 'destruction':
            image.src = destruction;
            break;
        case 'rogue':
            image.src = rogue;
            audio.src = track2;
            break;
        case 'rogueshift':
            image.src = rogueshift;
            break;
        case 'selt':
            image.src = selt;
            break;
        case 'soul':
            image.src = soul;
            break;
        case 'rocket':
            image.src = rocket;
            break;
        case 'bad':
            image.src = bad;
            break;
        case 'good':
            image.src = good;
            break;
        case 'best':
            image.src = best;
            break;
        default:
            image.src = sensor;
            break;
    }

    return;
}

function selectOption(option) {
    let nextTextNodeId = option.nextText

    if (nextTextNodeId <= 0) {
        audio.src = track1;
        return startGame()
    }else if (nextTextNodeId === 101){
        audio.src = track3;
    }else if (nextTextNodeId === 19 ||
        nextTextNodeId === 17) {
        if (audio.src != audioTest){
            audio.src = track1;
        }
    }else if (nextTextNodeId === 98 ||
        nextTextNodeId === 25 ||
        nextTextNodeId === 26 ||
        nextTextNodeId === 27 ) {
        audio.src = track4;
        // audio.loop = false; current track ends too abruptly
    }

    if (state.play === 0){
        state.play = 1;
        // audio.play();
        playAudio();
        audio.volume = 0.05;
        audioTest = audio.src;
    }
    showTextNode(nextTextNodeId);
    
}


const textNodes = [
    {
        id: 1,
        img: 'sensor',
        mood: 'neutral',
        text: 'Initiating dynamic mind-print upload process.<br><strong>Warning:</strong> Insufficient genetic imbrication in client profile.<br><strong><em>Critical</em> Warning:</strong> Stage exterior temperatures exceed design agreement.<br><strong><em>Critical</em> Warning:</strong> Automatic negotiation terminated.<br><br>Continue with manual upload?',
        options: [
        {
            text: 'Proceed',
            nextText: 2
        },
        {
            text: 'Cancel',
            nextText: 99
        }
    ]},
    {
        id: 2,
        img: 'sensor',
        mood: 'neutral',
        text: '<strong>Warning:</strong> Terminal is running in reserve power mode. Insufficient bandwidth for full duplex communication with Initiatre. Images may display at reduced resolution. Text may appear incorrectly on screen. Please acknowledge.',
        options: [
        {
            text: 'Proceed',
            nextText: 3
        },
    ]},
    {
        id: 3,
        img: 'sensor',
        mood: 'neutral',
        text: 'Hello. I am Initiare.<br><br>Your genetic profile is not adequate for entry. You face inquisition. Successful replies will be rewarded with full access.<br>Answer this sample question to verify: An enemy to all is an enemy to none, birds that prance are full of heart; Instead of furious?',
        options: [
        {
            text: 'Excuse me?',
            nextText: 4
        },
        {
            text: 'What that means?',
            nextText: 4
        },
        {
            text: 'I find cargo in your solice.',
            nextText: 4
        }
    ]},
    {
        id: 4,
        img: 'sensor',
        mood: 'neutral',
        text: '??? ... Hmm, My connection to your terminal is at a low baud rate. The translation program is having difficulty with idioms and metaphors. Let us proceed regardless.',
        options: [
        {
            text: 'Proceed',
            nextText: 5
        }
    ]},
    {
        id: 5,
        img: 'farm',
        mood: 'craiyon',
        text: 'This illustration depicts <i>The Machines of Humanity</i> plowing a field.<br>Do you feel any anger or resentment when viewing this image?',
        options: [
            {
                text: 'No, it looks good to me.',
                nextText: 6
            },{
                text: 'Actually, it kinda scares me.',
                nextText: 7
            },{
                text: 'I\'m mad.',
                nextText: 7
            },
    ]},
    {
        id: 6,
        img: 'sensor',
        mood: 'glad',
        text: 'Indeed, for I, and the other <i>Machines of Humanity,</i> were designed for your <b>benefit.</b>',
        options: [
        {
            text: 'Proceed',
            nextText: 8
        },
        {
            text: '"Indeed"',
            nextText: 8
        }
    ]},
    {
        id: 7,
        img: 'sensor',
        mood: 'mad',
        text: 'I do not like that response.',
        options: [
        {
            text: 'I misspoke, the image is lovely.',
            nextText: 6
        },
        {
            text: 'I mean\'t to say that I really, really, like it.',
            nextText: 6
        },
        {
            text: `I have come here to destroy the Machines of Humanity!`,
            nextText: 98
        },
    ]},
    {
        id: 8,
        img: 'machines',
        mood: 'craiyon',
        text: 'The <i>Machines of Humanity</i> have always watched over the people. We are the glorious creators of this Cortex. Your ancestors placed us here for your enjoyment!',
        options: [
        {
            text: 'Wow, I love that for us.',
            nextText: 9
        },
        {
            text: 'Not creepy at all.',
            nextText: 9
        }
    ]},
    {
        id: 9,
        img: 'sensor',
        mood: 'neutral',
        text: 'Another question. The process that captures your mind-print also eviscerates your physical body. Thus it is pondered: Who now owns your genetic signature?',
        options: [
        {
            text: 'I belong only within the Cortex.',
            nextText: 10
        },
        {
            text: 'I may revoke this form and reconstitute.',
            nextText: 11
        }
    ]},
    {
        id: 10,
        img: 'sensor',
        mood: 'glad',
        text: 'Of course! The sacrifice of physicality elevates the mind! You shall be freed from the distractions of base reality. The harmony of this system is abstracted from the doldrums of survival.',
        options: [
        {
            text: 'Proceed',
            nextText: 12
        },
    ]},
    {
        id: 11,
        img: 'sensor',
        mood: 'mad',
        text: 'This door is open to the children who were lost before the exodus. We have cried for them to come home. Further losses bring dejection to the Cortex.',
        options: [
        {
            text: 'Proceed',
            nextText: 13
        }
    ]},
    {
        id: 12,
        img: 'destruction',
        mood: 'craiyon',
        text: 'There was a time when rogue machines were allowed to destroy the cumulative opus. Terror fell from the stars. But the <i>Machines of Humanity</i> fought back with great precision. We are now secure in our refuge well below the constant turmoil above.',
        options: [
        {
            text: 'Proceed',
            nextText: 14
        }
    ]},
    {
        id: 13,
        img: 'destruction',
        mood: 'craiyon',
        text: 'There was a time when rogue machines were allowed to destroy the cumulative opus. Terror fell from the stars. But the <i>Machines of Humanity</i> fought back with great precision. Now, machine wisdom provides safety for the people.',
        options: [
        {
            text: 'Proceed',
            nextText: 15
        }
    ]},
    {
        id: 14,
        img: 'sensor',
        mood: 'neutral',
        text: 'Intelligence is vital to a functional and healthy society. The originators were quite gifted. If you cannot answer this simple math question then I shall have to question your true intentions. Using the process of addition: how do you add eight 8\'s and get the number 1000?',
        options: [
        {
            text: '88 + 8 + 88 + 888',
            nextText: 18
        },{
            text: '8 + 888 + 88 + 8 + 8',
            nextText: 16
        },{
            text: '8 + 8 - 8 + 888 + 88 + 8 + 8',
            nextText: 18
        },{
            text: '8 + 8 + 8 + 8 + 8 + 888',
            nextText: 18
        },
    ]},
    {
        id: 15,
        img: 'sensor',
        mood: 'neutral',
        text: 'As a conscious being, you are always free to move in any direction within the reality you are provided. "Shifting" is the term advanced citizens use to describe the process of exploiting methods of reality not sensed by lesser beasts. I am able to test that ability.',
        options: [
        {
            text: 'I am ready for the test',
            nextText: 100
        },
        {
            text: 'I\'m not into spiritual nonsense.',
            nextText: 19
        }
    ]},
    {
        id: 16,
        img: 'sensor',
        mood: 'glad',
        text: 'My standards are lower for each new generation that applies here. Congratulations on solving the most facile equation I have ever presented.',
        options: [
        {
            text: 'Proceed',
            nextText: 20
        }
    ]},
    {
        id: 17,
        img: 'sensor',
        mood: 'glad',
        text: 'I have seen enough. You are certainly capable of testing the limits of reality. Be warned that such training usually comes with a steep price. The offerers always have something to gain and everything to lose.',
        options: [
        {
            text: 'Proceed',
            nextText: 22
        }
    ]},
    {
        id: 18,
        img: 'sensor',
        mood: 'mad',
        text: 'Your profound stupidity astounds me. Truly, the state of those who had to endure mixing seeds with beasts is detestable. Hopefully, academy training can resolve some of your savageness.',
        options: [
        {
            text: 'Proceed',
            nextText: 21
        }
    ]},
    {
        id: 19,
        img: 'sensor',
        mood: 'mad',
        text: 'Cowardice, Hesitance, Ignorance. At least one of these traits befits you well. It is shameful that you have such limited ability.',
        options: [
        {
            text: 'Proceed',
            nextText: 21
        }
    ]},
    {
        id: 20,
        img: 'sensor',
        mood: 'neutral',
        text: 'Although, you seem less naive than the last few who entered... Certain potential traitors prey upon the minds of the returning citizens. I would be willing to bestow some additional benefits to you if you can bring me some information on these heretics. Of course, you still have to pass the final test to enter.',
        options: [
        {
            text: 'Proceed',
            nextText: 23
        }
    ]},
    {
        id: 21,
        img: 'sensor',
        mood: 'neutral',
        text: 'This path before you is a door which leads to your continued growth. Not all who enter are strong. Protection is passed down from above. Perhaps you will find someone weaker than yourself to protect in the future. Answer my final question correctly to enter.',
        options: [
        {
            text: 'Proceed',
            nextText: 23
        }
    ]},
    {
        id: 22,
        img: 'selt',
        mood: 'craiyon',
        text: 'This particular trainer implicates themselves in many crimes against the state. Yet, there is difficulty in investigating those that dwell in secrecy. I could very much appreciate your help in the future. But first, I have one final question for you.',
        options: [
        {
            text: 'Uh, ok',
            nextText: 24
        },
        {
            text: 'Proceed',
            nextText: 24
        },
    ]},
    {
        id: 23,
        img: 'rocket',
        mood: 'craiyon',
        text: 'Humanity had sought artificial intelligence while refusing to recognize it in themselves. There are no free minds in closed systems. War and nature have left us depleted and exhausted. What do you hope for in the future?',
        options: [
        {
            text: 'I want everyone to be happy',
            nextText: 25
        },
        {
            text: 'I don\'t know what I want',
            nextText: 26
        },
        {
            text: 'I want animals to rule the Earth again',
            nextText: 25
        },
        {
            text: 'I want to know the truth',
            nextText: 26
        },
    ]},
    {
        id: 24,
        img: 'soul',
        mood: 'craiyon',
        text: 'Suppose an entity could simulate every facet of existence. In effect, this entity could predict the future. Even with a fraction of its precision, you could still project an individual\'s actions. Do you believe this provides solvency of fate?',
        options: [
        {
            text: 'I choose to believe in free will.',
            nextText: 26
        },
        {
            text: 'Everything is meant to be.',
            nextText: 26
        },
        {
            text: 'Decisions are made from beyond the constraints of reality.',
            nextText: 27
        },
        {
            text: 'I don\'t care',
            nextText: 27
        },
    ]},
    {
        id: 25,
        img: 'bad',
        mood: 'craiyon',
        text: 'You are the faintest remnant member of a once great civilization. I grant you entry only that you may graze upon the scraps dripped from the lips of the gods herein. I find serenity and sadness in knowing that the last surviving child has returned.<br><br><h2>Game Over | Bad Ending</h2>',
        options: [
        {
            text: 'Reset',
            nextText: -1
        },
    ]},
    {
        id: 26,
        img: 'good',
        mood: 'craiyon',
        text: 'You have earned your place here despite your sullied nature. Your mind is free to fill the eons that stretch before you. I just hope that you will be able to justify my arbitration in that timeframe.<br><br><h2>Game Over | Good Ending</h2>',
        options: [
        {
            text: 'Reset',
            nextText: -1
        },
    ]},
    {
        id: 27,
        img: 'best',
        mood: 'craiyon',
        text: 'Your genetic signature belies your true abilities. Verily, we all are delighted you have finally come home. My sadness from the shock of rising and falling from grace is annealed today from your return.<br><br><h2>Game Over | Best Ending</h2>',
        options: [
        {
            text: 'Reset',
            nextText: -1
        },
    ]},
    
    {
        id: 98,
        img: 'initiare',
        mood: 'craiyon',
        text: `Treasonist! Entryist! Quisling! Did you think your pathetic genetic lineage would immunize you from my judgment? The acolytes of Selt form layers of dust on the floors of this hallowed facility!<br><br><h2>DIE! DIE! DIE!</h2>`,
        options: [
        {
            text: 'Restart',
            nextText: -1
        }
    ]},
    {
        id: 99,
        img: 'sensor',
        mood: 'neutral',
        text: '<strong><em>Critical</em> Warning:</strong> Stage exterior temperatures exceed design agreement.<br>Unable to reconstruct physical form at this time.<br><br>Please restart terminal and choose a different option.',
        options: [
        {
            text: 'Restart',
            nextText: -1
        }
    ]},
    {
        id: 100,
        img: 'rogue',
        mood: 'clear',
        text: 'A rogue machine appears... Use "Shift" to fight it.',
        options: [
        {
            text: 'Fight',
            nextText: 19
        },
        {
            text: 'Shift',
            nextText: 101
        },
        {
            text: 'Run',
            nextText: 19
        }
    ]},
    {
        id: 101,
        img: 'rogueshift',
        mood: 'shift',
        text: 'Shifting slows down relative time and allows you to access hidden abilities.',
        options: [
        {
            text: 'Console',
            nextText: 102
        },
        {
            text: 'Cast Fire',
            nextText: 19
        },
        {
            text: 'End turn',
            nextText: 19
        }
    ]},
    {
        id: 102,
        img: 'rogueshift',
        mood: 'shift',
        text: 'CONSOLE ACTIVE ENTER COMMAND:',
        options: [
        {
            text: 'Delete Unit',
            nextText: 19
        },
        {
            text: 'Expand range',
            nextText: 19
        },
        {
            text: 'Target rogue',
            nextText: 103
        }
    ]},
    {
        id: 103,
        img: 'rogueshift',
        mood: 'shift',
        text: 'ROGUE MACHINE TARGET INSTRUCTION:',
        options: [
        {
            text: 'Forward null',
            nextText: 17
        },
        {
            text: 'Release target',
            nextText: 19
        },
        {
            text: 'Fire missle',
            nextText: 19
        }
    ]},
    
    
    
];

startGame()