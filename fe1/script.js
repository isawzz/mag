
const IDLE_THRESHOLD = 30; // Time before we set user state to idle
const SHOW_DEBUG_BUTTON = true;
let DEBUG = localStorage.getItem('DEBUG') === 'true' && SHOW_DEBUG_BUTTON; //// const DEBUG = true;

const MESSAGE_START = "Hello! I'm a personal assistant designed browse the web and find interesting articles for you to read. To help me find relevant articles for you, could you tell me a bit about your browsing and reading habits?";
const MESSAGE_CATEGORY = "Thanks! Let me try to find some relevant articles for you. What topics would you be interested in?";
const MESSAGE_CANDIDATES = "Great! Here are some articles that I found that you might be interested in. What do you think?";
const MESSAGE_SELECTION = "Interesting. Which of these articles match your request best?";
const MESSAGE_MORE_CANDIDATES = "Thank you! Here are some more articles that may be relevant to your request. What do you think?";
const MESSAGE_REVISION = "Thanks! Based on the articles you selected, is there anything you would like to add to your request to make it easier to find similar articles?";

function toggleDebug() {
  DEBUG = !DEBUG;
  localStorage.setItem('DEBUG', DEBUG);  // Store flag in localStorage
  location.reload();  // Refresh the page
}
let debug_button = document.createElement('button');
function createDebugButton() {
  debug_button.innerHTML = DEBUG ? 'DEBUG ON' : 'DEBUG OFF';
  debug_button.style.position = 'fixed';
  debug_button.style.top = '10px';
  debug_button.style.left = '10px';
  debug_button.style.zIndex = '9999';
  debug_button.style.padding = '10px';
  debug_button.style.backgroundColor = DEBUG ? '#0f0' : '#f00';
  debug_button.style.color = '#fff';
  debug_button.style.border = 'none';
  debug_button.style.cursor = 'pointer';

  debug_button.addEventListener('click', toggleDebug);
  if (SHOW_DEBUG_BUTTON) {
    document.body.appendChild(debug_button);
  }
}

// Run the function to create the debug button when the page loads
window.onload = createDebugButton;

// Example: Use the DEBUG in your site logic
if (DEBUG) {
  console.log('DEBUG MODE ON');
  // Add additional debug logic here
} else {
  console.log('DEBUG MODE OFF');
}

var CANDIDATES_PER_PAGE = DEBUG ? 6 : 12;

var candidate_templates = [];
var windowWidth = window.innerWidth;

// raise an alert if the width is <1000px
if (!DEBUG && windowWidth < 1040) {
  alert("Please increase the width of your browser window to at least 1040px to ensure the best user experience.");
}

var cardWidth = 300;
var cardMargin = 20;
var cardsPerRow = Math.floor((windowWidth - 20) / (cardWidth + cardMargin));

// var DATA_ENDPOINT = "https://cors-anywhere.herokuapp.com/https://llmrecs.z13.web.core.windows.net/";
// var DATA_ENDPOINT = "https://llmrecs.z13.web.core.windows.net/";
// DATA_ENDPOINT = "https://llmrecs.blob.core.windows.net/";
DATA_ENDPOINT = "";

async function loadItemData() {
  try {
    // const response = await fetch(`${DATA_ENDPOINT}news_items.json`, { mode: 'no-cors' });
    const response = await fetch(`${DATA_ENDPOINT}news_items.json`);
    //console.log(response);
    return await response.json();
  } catch (error) {
    return console.error('Error:', error);
  }
}

async function loadCategories() {
  try {
    const response = await fetch(`${DATA_ENDPOINT}news_categories.json`);
    return await response.json();
  } catch (error) {
    return console.error('Error:', error);
  }
}

function selectItems(all_items, categories, num) {
  var cards = categories.includes("any") ? all_items : all_items.filter(card => card.category && (!categories || categories.includes(card.category)));
  const sel = cards.sort(() => 0.5 - Math.random()).slice(0, num);
  return sel;
}

function fill_cards(q, candidates) {
  for (i = 0; i < candidates.length; i++) {
    // q.elements[i].elements[0].imageLink = candidates[i].thumbnail;
    // q.elements[i].elements[0].description = candidates[i].category;
    // q.elements[i].elements[1].title = `<img src="${candidates[i].thumbnail}" class="card-img-top" alt="${candidates[i].title}">` + candidates[i].title;
    // q.elements[i].elements[1].description = candidates[i].description;
    q.elements[i].title = `<img src="${candidates[i].thumbnail}" class="card-img-top" alt="${candidates[i].title}">` + candidates[i].title;
    q.elements[i].description = candidates[i].description;

  }
}

function html_cards(cards) {
  var html = '<div style="align-items: stretch; display: flex; flex-direction: row; flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden; gap: 1rem;">';
  const cardcss = "max-width: 20%; padding: .75rem; margin-bottom: 2rem; border: 0; flex-basis: 20%; flex-grow: 0; flex-shrink: 0; box-sizing: border-box; margin-top: 0.5rem; background-color: white; border: 1px solid rgb(0,0,0,0.15); border-radius: .25rem;";
  for (i = 0; i < cards.length; i++) {
    if (false && cards[i].description) {
      // html += `<div style="width: 18rem; margin: 10px;">
      html += `<div style="${cardcss}">
            <img src="${cards[i].thumbnail}" class="card-img-top" alt="${cards[i].title}">
              <h6 style="font-size: 85%; line-height: 1.4;">${cards[i].title}</h6>
              <p style="font-size: 85%; line-height: 1.4;">${cards[i].description}</p>
            </div>`;
    } else {
      html += `<div style="${cardcss}">
            <img src="${cards[i].thumbnail}" class="card-img-top" alt="${cards[i].title}">
              <h6 style="font-size: 85%; line-height: 1.4;">${cards[i].title}</h6>
            </div>`;
    }

  }
  html += '</div>';
  return html
}

function html_table(cards) {
  var html = '<table style="width: 100%; table-layout: fixed;">';
  const cardcss = "padding: .75rem; margin-bottom: 2rem; border: 0; box-sizing: border-box; margin-top: 0.5rem; background-color: white; border: 1px solid rgb(0,0,0,0.15); border-radius: .25rem;";

  for (let i = 0; i < cards.length; i++) {
    if (i % 3 === 0) {
      // Start a new row every 3 cards
      if (i > 0) {
        html += '</tr>'; // Close previous row
      }
      html += '<tr>';
    }

    html += `<td style="width: 33%; vertical-align: top;">
            <div style="${cardcss}">
                <img src="${cards[i].thumbnail}" style="width: 100%;" alt="${cards[i].title}">
                <h6 style="font-size: 85%; line-height: 1.4;">${cards[i].title}</h6>`;

    if (cards[i].description) {
      html += `<p style="font-size: 85%; line-height: 1.4;">${cards[i].description}</p>`;
    }

    html += `</div></td>`;
  }

  html += '</tr></table>';
  return html;
}

function fill_html_cards(sel, candidates) {
  var selected = [];
  var unselected = [];
  for (i = 0; i < sel.length; i++) {
    if (sel[i].value) {
      selected.push(candidates[i]);
    } else {
      unselected.push(candidates[i]);
    }
  }
  // console.log(selected);
  // console.log(unselected);

  var html = '<h5>Selected Articles</h5>';
  html += html_cards(selected);
  html += '<h5>Non-selected Articles</h5>';
  html += html_cards(unselected);
  return html;
}

function escapeHtml(str) {
  return $('<div>').text(str).html();
}

function isOnMTurk() {
  return false;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('turkSubmitTo');
}

function isPreview() {
  return false;
  const urlParams = new URLSearchParams(window.location.search);
  return ((urlParams.has("assignmentId")) && (urlParams.get('assignmentId').toUpperCase() == "ASSIGNMENT_ID_NOT_AVAILABLE"));
}

function isLocal() {
  return (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "");
}

function submitData(data) {
  //console.log("Submitting data");
  // console.log(data);
  const urlParams = new URLSearchParams(window.location.search)

  // create the form element and point it to the correct endpoint
  const form = document.createElement('form')
  form.action = (new URL('mturk/externalSubmit', urlParams.get('turkSubmitTo'))).href
  form.method = 'post'

  // attach the assignmentId
  const inputAssignmentId = document.createElement('input')
  inputAssignmentId.name = 'assignmentId'
  inputAssignmentId.value = urlParams.get('assignmentId')
  inputAssignmentId.hidden = true
  form.appendChild(inputAssignmentId)

  // attach data I want to send back
  const inputData = document.createElement('input')
  inputData.name = 'assignmentData'
  inputData.value = JSON.stringify(data)
  inputData.hidden = true
  form.appendChild(inputData)

  // attach the form to the HTML document and trigger submission
  document.body.appendChild(form)
  form.submit()
}

function flattenObject(ob) {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

var model = {
  events: [],
  addEvent: function (type, trigger, details, duration, time) {
    trigger = (typeof trigger === 'undefined') ? null : trigger;
    duration = (typeof duration === 'undefined') ? null : duration;
    time = (typeof time === 'undefined') ? Date.now() : time;
    details = (typeof details === 'undefined') ? null : details;
    let event = {
      type: type,
      trigger: trigger,
      details: details,
      duration: duration / 1000,
      time: time
    };
    this.events.push(event);
    //console.log(event);
  }
}

function generateConsentPage() {
  return {
    name: "consent",
    title: "Consent Form",
    elements: [
      {
        type: "html",
        html: `<h3>Project Title: Towards Personalized Interactive Recommendations for News Articles</h3>
                <h4>Investigators: Felix Leeb and Tobias Schnabel</h4>
                <p><b>Invitation:</b> Thank you for taking the time to consider participating in a Microsoft Research project. The purpose of this research is to improve recommendation systems by using user requests and feedback to personalize recommendations. We are interested in understanding how people make requests to a personal assistant together with the corresponding behavior that is expected to enable AI personal assistants to better understand and respond to user requests for recommendation systems.</p>
                <p><b>Procedures:</b> If you choose to participate, you will be asked to complete this online survey which starts by asking some general questions about your news habits and preferences to put your responses into context. Next, you will be asked to write specific requests that you would make to a personal assistant, and select the corresponding news articles that you would like to receive based on your requests. Finally, you will be asked to update your request based on the recommendations that the personal assistant provides. In total, your participation will take around 20 minutes, and there is no need to prepare anything in advance or any follow-up required.</p>
                <p>During the study, we plan to collect information about you such as self-described usage habits of news articles as well as your preferences and interests. We will also collect the responses you provide to the recommendations that the personal assistant provides. We will not record any information from you beyond your survey responses.</p>
                <p><b>Compensation:</b> You will be compensated for your participation in this study through the Mechanical Turk platform. You will receive $3 for completing the survey.</p>
                <p><b>Benefits:</b> There will be no direct benefit to you as a result of participating in this study. However, we hope that findings from this research will improve recommendation systems across diverse domains to make them more personalized and relevant to users like you.</p>
                <p><b>Risks:</b> The risks of participating are similar to what you might experience while performing everyday tasks. Risks include fatigue or frustration from answering questions, or discomfort from sitting for an extended period of time.</p>
                <p>To minimize these risks, we have designed the study to be as engaging as possible, and you are free to take breaks at any time.</p>
                <p><b>Privacy & Confidentiality:</b> Researchers will keep your participation and the information you share as confidential as possible. We will not ask you to provide your name or any information that could directly identify you.</p>
                <p>We plan to share some of your responses to the survey questions with our research intern for the purpose of collaborative analysis and evaluating recommendation systems. They will retain access to this data for 3 months.</p>
                <p>Researchers may share the results of this study publicly, such as in journal articles or conference presentations, but no identifying information about you will be included. Subsequently, the data may be published in a public repository for other researchers to use.</p>
                <p>Information and data collected from you during this study may be used for future research studies or to improve products or services at Microsoft. If that happens, it will not be possible to identify you because we never collected your identity.</p>
                <p>If you decide to withdraw from the study, please note it would not be possible to remove the data you have already shared, because it will not be identifiable.</p>
                <p>For questions about how Microsoft manages your privacy, please see the <a href="http://go.microsoft.com/fwlink/?LinkId=521839">Microsoft Privacy Statement</a>.</p>
                <p>Participation is your choice: Whether or not you participate is entirely up to you. You can decide to participate now and stop participating later. Your decision of whether or not to participate will have no impact on any other services or agreements you have with Microsoft outside of this research.</p>
                <p><b>Questions or Concerns:</b> If you have any questions or concerns about this study at any time, you may contact the research team at <a href="mailto:MSRStudyfeedback@microsoft.com">MSRStudyfeedback@microsoft.com</a>.
                <p>If you would like to keep a copy of this consent form, please print or save one now.</p>
                <p></p>
                <p>If you understand and agree to the terms of this study, please click the button below to continue.</p>
                `
      }
    ],
    pageNextText: "Agree and Continue",
  }
}

function generateFeedbackPage() {
  return {
    name: "feedback",
    title: "Feedback",
    description: `Please provide any feedback you have about the study to help us improve our research. Our goal is to make recommendation systems more personalized and respond to user requests more effectively.`,
    elements: [
      {
        type: "boolean",
        name: "sensical",
        title: "The tasks in this study were clear and made sense to me.",
        isRequired: !DEBUG,
      },
      {
        type: "comment",
        name: "feedback",
        title: "If you found the tasks unclear, please describe what was confusing. Or, if you found the tasks clear, please describe how we might improve the study.",
        rows: 4,
        autoGrow: true,
        allowResize: true,
        isRequired: !DEBUG,
      }
    ]
  }
}

function generateIntakePage() {
  return {
    name: "intake",
    title: "Describe your news browsing habits",
    elements: [
      {
        type: "html",
        html: showAsChat([
          { role: 'bot', content: MESSAGE_START },
        ]),
      },
      {
        type: "checkbox",
        name: "sources",
        title: "Which types of sources do you regularly use to discover web articles? Please select all that apply.",
        isRequired: !DEBUG,
        colCount: 1,
        choices: [
          "Social media feeds (e.g. Facebook, Twitter)",
          "Online newspapers (e.g. New York Times, Washington Post)",
          "Digital magazines/blogs (e.g., Medium, BuzzFeed, The Verge)",
          "News aggregators (e.g., Google News, Apple News, Bing News)",
          "Email newsletters or subscriptions (e.g., Substack, TheSkimm)",
          "Video platforms (e.g., YouTube, TikTok)",
          "Podcasts or audio news (e.g., NPR, The Daily)",
        ]
      },
      {
        type: "checkbox",
        name: "article_reasons",
        title: "What are some of the most common reasons why you select a news article?",
        isRequired: !DEBUG,
        colCount: 2,
        choices: [
          "Keep up with national/global events",
          "Local news or events",
          "Personal interests or hobbies",
          "Professional interests or work-related",
          "Suggestions from friends",
          "Other"
        ]
      },
      {
        type: "comment",
        name: "sources_details",
        title: "What specific news sources do you browse regularly? What sources do you generally find most useful or reliable? Why? Please also describe any other sources you use that were not listed above.",
        rows: 4,
        autoGrow: true,
        allowResize: false,
        isRequired: !DEBUG,
      },
      {
        type: "radiogroup",
        name: "news_frequency",
        title: "How often do you browse the web for articles to read?",
        isRequired: !DEBUG,
        colCount: 3,
        choices: [
          "Multiple times a day",
          "Once a day",
          "A few times a week",
          "Several times a month",
          "Once a month",
          "Rarely or never"
        ]
      },
      // {
      //     type: "rating",
      //     name: "satisfaction-numeric",
      //     title: "How many news articles do you browse on an average day?",
      //     autoGenerate: false,
      //     isRequired: !DEBUG,
      //     rateValues: [ "0", "1-3", "4-6", "7-9", "10+" ]
      // },
      // generally satisfied with news feeds and recommended articles
      {
        type: "panel",
        name: "browsing",
        title: "Select to what extent you agree with the following statements.",
        elements: [
          {
            type: "rating",
            name: "goal",
            title: "When selecting news articles, I typically have a clear goal in mind (e.g., seeking specific information, staying updated on a topic).",
            isRequired: !DEBUG,
            rateValues: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
          },
          {
            type: "rating",
            name: "personalized",
            title: "I rely heavily on personalized news feeds or recommendations to discover articles that are relevant to me.",
            isRequired: !DEBUG,
            rateValues: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
          },
          {
            type: "rating",
            name: "satisfied",
            title: "I feel satisfied with the accuracy and relevance of the articles recommended to me by news platforms or social media.",
            isRequired: !DEBUG,
            rateValues: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
          },
          {
            type: "rating",
            name: "explore",
            title: "I tend to browse news articles without a specific purpose, simply exploring what looks interesting at the moment.",
            isRequired: !DEBUG,
            rateValues: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
          },
          {
            type: "rating",
            name: "trust",
            title: "The news recommendations I receive help me stay informed on the topics that are most important to me.",
            isRequired: !DEBUG,
            rateValues: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
          }
        ]
      },
      {
        type: "comment",
        name: "selection_details",
        title: "How do you usually choose news articles to read? Do you follow specific goals or browse freely? What's your experience with news recommendations—are they helpful or relevant?",
        // description: "Including the types of articles you like to read, the topics you are interested in, the sources you trust, and your habits for reading news.",
        rows: 4,
        autoGrow: true,
        allowResize: false,
        isRequired: !DEBUG,
      }
      // {
      //     type: "radiogroup",
      //     name: "article_selection",
      //     title: "What best describes your selection of news articles?",
      //     isRequired: !DEBUG,
      //     colCount: 1,
      //     choices: [
      //         "I almost always seek out articles about the same specific topics or interests",
      //         "I generally focus on articles about a small number of topics, but occasionally something different",
      //         "The topics I read about varies frequently depending on the day or mood",
      //         "I have no strong preferences and read whatever catches my eye"
      //     ]
      // },
      // {
      //     type: "comment",
      //     name: "article_preferences",
      //     title: "Describe your interests and preferences for news articles in general.",
      //     description: "Including the types of articles you like to read, the topics you are interested in, the sources you trust, and your habits for reading news.",
      //     rows: 4,
      //     autoGrow: true,
      //     allowResize: false,
      //     isRequired: !DEBUG,
      // }
    ]
  }

}

function generateCandidateTemplates(ident, num) {
  var candidate_templates = [];
  for (var i = 0; i < num; i++) {

    candidate_templates.push({
      type: "boolean",
      name: `${ident}_${i}`,
      title: "[Article Title]",
      description: "[Article Description]",
      isRequired: true,
      // startWithNewLine: false,
      startWithNewLine: i > 0 && i % cardsPerRow == 0,
    });
  }
  return candidate_templates;
}

function showAsChat(convo, continuing) {

  //                 `
  //                 <div class="chat-space">
  //     <i class="fas fa-robot fa-2x assistant-icon"></i>
  //     <div class="chat-container">
  //     <div class="chat-box">
  //         <div style="display: flex; justify-content: center; padding: 20px;">
  //             <i class="fa fa-ellipsis-v fa-lg" style="color: grey"></i>
  //         </div>

  //         <div class="chat-message">
  //             <div class="bot-bubble chat-bubble">
  //                 Hello! How can I help you today?
  //             </div>
  //         </div>
  //         <div class="chat-message">
  //             <div class="user-bubble chat-bubble">
  //                 Hi! I need some information about your services.
  //             </div>
  //         </div>
  //         <div class="chat-message">
  //             <div class="bot-bubble chat-bubble">
  //                 Sure! What would you like to know?
  //             </div>
  //         </div>
  //     </div>
  // </div>
  //     <i class="fas fa-user fa-2x user-icon">You</i></div>`
  var html = `<div class="chat-space">
        <i class="fas fa-robot fa-2x assistant-icon"></i>
        <div class="chat-container"><div class="chat-box">`;

  if (continuing) {
    html += `<div style="display: flex; justify-content: center; padding: 20px;">
                    <i class="fa fa-ellipsis-v fa-lg" style="color: grey"></i>
                </div>`;
  }
  for (var i = 0; i < convo.length; i++) {
    html += `<div class="chat-message"><div class="${convo[i].role}-bubble chat-bubble">
                    ${convo[i].content}
                </div></div>`;

  }
  html += `</div></div><i class="fas fa-user fa-2x user-icon"></i></div>`;
  return html;
}

function generateRound(ident, categories, num) {
  const candidate_templates = generateCandidateTemplates(`${ident}_candidate`, num);
  const candidate2_templates = generateCandidateTemplates(`${ident}_updated_candidate`, num);
  const pages = [
    {
      name: `${ident}_intro`,
      title: "Make a Request",
      description: "Imagine you are making a request to your personal assistant to find some interesting articles for you.",
      elements: [
        {
          type: 'html',
          html: showAsChat([
            { role: 'bot', content: MESSAGE_START },
            { role: 'user', content: "{sources_details}" },
            { role: 'user', content: "{selection_details}" },
            { role: 'bot', content: MESSAGE_CATEGORY }
          ])
        },
        {
          type: "checkbox",
          name: `${ident}_categories`,
          isRequired: true,
          title: "Select the categories of articles that your personal assistant should find for you.",
          colCount: 3,
          choices: Object.keys(categories)
        }
      ],
    },
    {
      name: `${ident}_request`,
      title: `Make a Request`,
      // description: "Imagine you have a personal assistant who is generally familiar with your news habits and interests. Now think of a particular request you might make to your personal assistant. \nYour request does not have to apply generally, but can be specific to your interests at any particular moment throughout the day. Perhaps you are enjoying breakfast in the morning, or taking a break to browse the news at work, or catching up with your interests in the evening.",
      elements: [
        {
          type: 'html',
          name: `${ident}_request_chat`,
          html: "[waiting for user response]",
        },
        {
          type: 'html',
          name: `${ident}_view_candidates`,
          html: `[selected articles]`,
        },
        {
          type: 'comment',
          name: `${ident}_criterion`,
          title: 'Pick <em>2-4</em> of the suggested articles that sound interesting, and then make a request that would help the personal assistant select those articles.',
          description: 'Tip: avoid being to specific to these particular articles, but make sure to include enough detail so that the personal assistant would select matching articles from a similar feed.',
          rows: 4,
          autoGrow: true,
          allowResize: false,
          isRequired: !DEBUG,
        },
      ]
    },
    {
      name: `${ident}_selection`,
      title: 'Finding Relevant Articles',
      description: `Now imagine you are the personal assistant, who knows your general preferences and habits for news articles (such as the region/city where you live and your occupation and hobbies).\n\nImagine you are given the request you wrote before and now it is your job to select a few news articles from the feed below.`,
      elements: [
        {
          type: 'html',
          // name: `${ident}_request_chat`,
          html: showAsChat([
            { role: 'bot', content: MESSAGE_CANDIDATES },
            { role: 'user', content: `{${ident}_criterion}` },
            { role: 'bot', content: MESSAGE_SELECTION }
          ], true),
        },
        {
          type: 'panel',
          name: `${ident}_candidates`,
          title: 'For each of the suggested articles, select whether it matches the request you wrote before.',
          description: `Tip: Make sure to select the 2-4 most relevant articles your request.`,
          elements: candidate_templates,
        }
      ]
    },
    {
      name: `${ident}_selection2`,
      title: 'Finding more Articles',
      // description: `Now pretend to be the personal assistant again, except that now you are given the updated request, and a new feed. What articles are most relevant to the new request?`,
      elements: [
        {
          type: 'html',
          html: showAsChat([
            { role: 'bot', content: MESSAGE_CANDIDATES },
            { role: 'user', content: `{${ident}_criterion}` },
            { role: 'bot', content: MESSAGE_SELECTION },
            // { role: 'user', content: `[selected articles]` },
            { role: 'bot', content: MESSAGE_MORE_CANDIDATES },
          ], true),
        },
        {
          type: 'panel',
          name: `${ident}_updated_candidates`,
          title: 'For each of these newly suggested articles, select the 2-4 most relevant articles to the request you wrote before.',
          // description: `Tip: Make sure to select the 2-4 most relevant articles your request.`,
          elements: candidate2_templates,
        }
      ]
    },
    // {
    //     name:  `${ident}_revision`,
    //     title: 'Updating the Request',
    //     description: 'Do the articles you selected match the original request perfectly? Try adding some details or context to make the selected articles match better. However, avoid making the request so specific that <em>only</em> the selected articles match.',
    //     elements: [
    //         {
    //             type: 'html',
    //             name: `${ident}_prev_request`,
    //             html: `Your original request: <p style="text-align: center;"><em>{${ident}_criterion}</em></p>`,
    //         },
    //         {
    //             type: 'html',
    //             name: `${ident}_prev_selection`,
    //             html: `[selected articles]`,
    //         },
    //         {
    //             type: 'comment',
    //             name:  `${ident}_updated_criterion`,
    //             title: 'Add to your original request to make the selected articles match better when given this additional context.',
    //             description: `Tip: you might include some details, emphasize certain topics, or connect the original request to an interest of yours to make the selected articles clearly match better to the new request than the non-selected articles.`, //\n\n<p style="text-align: center;"><em>{${ident}_criterion}</em></p>
    //             rows: 4,
    //             autoGrow: true,
    //             allowResize: false,
    //             isRequired: !DEBUG,
    //         },
    //     ]
    // },

    {
      name: `${ident}_revision2`,
      title: 'Revising the Request',
      // description: 'Now that you have selected all the most relevant articles to your request, you can add to the request one last time to make sure that selected articles match well.',
      elements: [
        {
          type: 'html',
          html: showAsChat([
            // { role: 'bot', content: MESSAGE_CANDIDATES },
            { role: 'user', content: `{${ident}_criterion}` },
            { role: 'bot', content: MESSAGE_SELECTION },
            // { role: 'user', content: `[selected articles]` },
            { role: 'bot', content: MESSAGE_MORE_CANDIDATES },
            // { role: 'user', content: `[selected articles]` },
            { role: 'bot', content: MESSAGE_REVISION },
          ], true),
        },
        // {
        //     type: 'html',
        //     name: `${ident}_prev_request`,
        //     html: `Your previous request: 
        //     <p style="text-align: center;"><em>{${ident}_criterion}</em></p>
        //     <p style="text-align: center;"><em>{${ident}_updated_criterion}</em></p>`,
        // },
        {
          type: 'html',
          name: `${ident}_prev_updated_selection`,
          html: `[selected articles]`,
        },
        {
          type: 'comment',
          name: `${ident}_final_criterion`,
          title: 'Think of additional details or context to make the selected articles match better to the request you wrote before.',
          // description: 'Your description should be specific enough so your assistant would select 5-8 of the candidate articles based on your request.',
          rows: 4,
          autoGrow: true,
          allowResize: false,
          isRequired: !DEBUG,
        },
      ]
    },
  ];

  return pages;
}

async function renderSurvey() {
  var categories = await loadCategories();
  var all_items = await loadItemData();

  const consentpage = generateConsentPage();
  const intakepage = generateIntakePage();
  const feedbackpage = generateFeedbackPage();

  const round1 = generateRound("round1", categories, CANDIDATES_PER_PAGE);
  const round2 = generateRound("round2", categories, CANDIDATES_PER_PAGE);

  for (var i = 0; i < round1.length; i++) {
    round1[i].title = "Round 1/2: " + round1[i].title;
  }
  for (var i = 0; i < round2.length; i++) {
    round2[i].title = "Round 2/2: " + round2[i].title;
  }


  var json = {
    // "title": "Preview",
    "logoFit": "none",
    "logoPosition": "right",
    "pages": [
      consentpage,
      intakepage,
      ...round1,
      ...round2,
      feedbackpage
    ],
    // "showTitle": isPreview(),
    "showPageTitles": true,
    "showPrevButton": false,
    "showCompletedPage": false,
    "showProgressBar": "none",
    "completeText": "Submit",
    // "requiredText": "<-",
    // "mode": isPreview() ? "display" : "edit",
    "widthMode": "responsive",
    // "questionsOnPageMode": isLocal() ? "singlePage" : null
    "showQuestionNumbers": "on",
    "showQuestionNumbers": "off",
  }
  if (DEBUG) {
    json.pages = [
      intakepage,
      ...round1,
    ];
  }

  var start = Date.now();
  Survey
    .StylesManager
    .applyTheme("layered");
  window.survey = new Survey.Model(json);
  // Survey.matrixDropdownColumnTypes.html = {};
  // Survey.matrixDropdownColumnTypes.barrating = {};
  survey.clearInvisibleValues = "none";
  survey.item_selection = {};
  survey
    .onComplete
    .add(function (sender) {
      //console.log("complete");
      var merged = {
        survey: flattenObject(sender.data),
        events: model.events,
        time_spent: (Date.now() - start) / 1000.0,
        items: survey.item_selection
      };

      if (isOnMTurk()) {
        submitData(merged);
      } else {
        $('#surveyResult').html("<pre>" + JSON.stringify(merged, null, 3) + "</pre>");
      }
      //console.log(merged);

    });
  survey.onCompleting.add(function (sender, options) {
    //console.log("completing");
    const timeSpent = (Date.now() - start) / 1000;
    if (timeSpent <= -1) {
      $("#error-message .modal-body").text("You need to spent at least 10s judging each example, but only spent " + Math.round(timeSpent) + "s. Failure to comply may result in elimination from the judge pool.");
      $("#error-message").modal();
      options.allowComplete = false;
    } else {
      options.allowComplete = true;
    }
  });
  survey.onValueChanged.add(function (sender, options) {
    model.addEvent("input", options.question.name, {
      "value": options.value
    });
  });
  survey.onCurrentPageChanged.add(function (sender, options) {
    survey.pageNextText = "Next";
    console.log(`_________next page ${sender.currentPage.name}`);


    if (sender.currentPage.name.endsWith("_request")) {
      var ident = sender.currentPage.name.split("_").slice(0, -1).join("_");
      var selectedCategories = survey.getValue(`${ident}_categories`).map(x => categories[x]);
      var el = sender.currentPage.getElementByName(`${ident}_request_chat`);
      el.html = showAsChat([
        { role: 'bot', content: MESSAGE_CATEGORY },
        { role: 'user', content: survey.getValue(`${ident}_categories`).join(", ") },
        { role: 'bot', content: MESSAGE_CANDIDATES }
      ], true);

      var candidates = selectItems(all_items, selectedCategories, CANDIDATES_PER_PAGE * 2);
      var items_ids = [];
      for (var i = 0; i < candidates.length; i++) {
        items_ids.push(candidates[i].ID);
      }
      survey.item_selection[ident] = items_ids;
      survey.item_candidates1 = candidates.slice(0, CANDIDATES_PER_PAGE);
      survey.item_candidates2 = candidates.slice(CANDIDATES_PER_PAGE);

      sender.currentPage.getElementByName(`${ident}_view_candidates`).html =
        `<h4>Suggested Articles</h4>${html_table(survey.item_candidates1)}`;
    }
    if (sender.currentPage.name.endsWith("_selection")) {
      var ident = sender.currentPage.name.split("_").slice(0, -1).join("_");
      var selectedCategories = survey.getValue(`${ident}_categories`).map(x => categories[x]);
      fill_cards(sender.currentPage.getElementByName(`${ident}_candidates`), survey.item_candidates1);
    }
    if (sender.currentPage.name.endsWith("_selection2")) {
      var ident = sender.currentPage.name.split("_").slice(0, -1).join("_");
      fill_cards(sender.currentPage.getElementByName(`${ident}_updated_candidates`), survey.item_candidates2);
    }
    if (sender.currentPage.name.endsWith("_revision2")) {
      var ident = sender.currentPage.name.split("_").slice(0, -1).join("_");
      var q = sender.currentPage.getElementByName(`${ident}_prev_updated_selection`);
      var selection = survey.getPageByName(`${ident}_selection`).getElementByName(`${ident}_candidates`);
      var selection2 = survey.getPageByName(`${ident}_selection2`).getElementByName(`${ident}_updated_candidates`);

      q.html = fill_html_cards(
        [...selection.elements, ...selection2.elements],
        [...survey.item_candidates1, ...survey.item_candidates2]
      );
    }

  });
  survey.onFocusInQuestion.add(function (sender, options) {
    if (options.question.getType() == "text") {
      model.addEvent("input", options.question.name, {
        "subType": "gotFocus"
      });
    }
  });
  survey.onAfterRenderQuestion.add(function (survey, options) {
    // console.log(options.question.name);
    if (/candidate_\d+$/.test(options.question.name)) {
      // console.log("changing css on html");
      // Add your custom class to the question root element
      options.htmlElement.classList.add("candidatecard");
    }
    // if (options.question.name.endsWith("_candidates")) {
    //     options.htmlElement.classList.add("candidatecontainer");
    // }
  });

  survey
    .onTextMarkdown
    .add(function (survey, options) {
      options.html = options.text;
    });

  if (survey.currentPage.name === "consent") {
    survey.pageNextText = "Agree and Continue";
  }


  if (DEBUG) {
    survey.setValue("sources_details", "I read news from a variety of sources, including social media, online newspapers, and news aggregators. I find that online newspapers are the most reliable and trustworthy sources for news.");
    survey.setValue("selection_details", "I usually browse news articles multiple times a day to stay informed on current events. I have a clear goal in mind when selecting news articles, and I rely on personalized news feeds to discover articles that are relevant to me.");

    survey.setValue("round1_categories", ['Entertainment']);
    survey.setValue("round1_criterion", "I want to read about the latest movies and TV shows.");
    // survey.setValue("round1_updated_criterion", "I want to read about the latest movies and TV shows, but only if they are available on streaming services.");
    survey.setValue("round1_final_criterion", "I want to read about the latest movies and TV shows, but only if they are available on streaming services, and are rated above 7/10.");

    for (var i = 0; i < CANDIDATES_PER_PAGE; i++) {
      survey.setValue(`round1_candidate_${i}`, Math.random() > 0.7);
    }
    for (var i = 0; i < CANDIDATES_PER_PAGE; i++) {
      survey.setValue(`round1_updated_candidate_${i}`, Math.random() > 0.7);
    }

  }

  $("#surveyContainer").Survey({
    model: survey
  });
}

function activateTracking() {
  $(window).data("idleUserTime", Date.now());
  $(window).data("hideWindowTime", Date.now());

  $("body").on("mousedown", "a", function (event) {
    const mp = {
      1: "left",
      2: "middle",
      3: "right",
      4: "aux1",
      5: "aux2"
    };
    model.addEvent("click", $(this).attr("data-urlid"), {
      mousebutton: mp[event.which]
    });
  });
  $("body").on("copy", function (event) {
    model.addEvent("copy", null, document.getSelection().toString());
  });
  $("body").on("paste", function (event) {
    model.addEvent("paste", null, event.originalEvent.clipboardData.getData('text/plain'));
    event.preventDefault();
  });
  ifvisible.setIdleDuration(IDLE_THRESHOLD);
  ifvisible.on("blur", function () {
    $(window).data("hideWindowTime", Date.now());
    model.addEvent("hide", "window");
  });
  ifvisible.on("idle", function () {
    $(window).data("idleUserTime", Date.now());
    model.addEvent("idle", "user");
  });
  ifvisible.on("wakeup", function () {
    model.addEvent("wakeup", "user", null, Date.now() - $(window).data("idleUserTime") || Date.now())
  });
  ifvisible.on("focus", function () {
    model.addEvent("show", "window", null, Date.now() - $(window).data("hideWindowTime") || Date.now());
  });

}

$(document).ready(async function () {
  $("#submitButton").hide(); // Hide MTurk controls
  await renderSurvey();
  activateTracking();
});