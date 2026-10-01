// Senior Fraud Shield / Honey Shield - Single Source of Truth for i18n
export const translations = {
  hi: {
    // Header & Meta
    appName: "हनी शील्ड",
    appSubtitle: "सीनियर फ्रॉड शील्ड",
    langToggle: "English",
    back: "पीछे जाएं",
    home: "होम",

    // Home Screen
    welcomeTitle: "नमस्ते, आप सुरक्षित हैं",
    welcomeSubtitle: "Welcome, you are safe",
    welcomeDescription: "हम आपके फ़ोन, परिवार और पेंशन को सुरक्षित रखने के लिए यहाँ हैं।",
    activeGuardTitle: "सक्रिय सुरक्षा कवच",
    activeGuardSubtitle: "शील्ड शांति से सुन रहा है • आप सुरक्षित हैं",
    
    // 3 Big Main Buttons
    btnCallCameIn: "मुझे अभी कॉल आया है",
    btnAlertFamily: "परिवार को बताएं",
    btnPractice: "अभ्यास करें",

    // Reassurance & Helplines
    noHurryTitle: "जल्दबाजी नहीं, कोई चिंता नहीं",
    noHurryDesc: "असली बैंक और पुलिस अधिकारी कभी भी फ़ोन या वीडियो कॉल पर तुरंत पैसे भेजने की मांग नहीं करते।",
    helplineTitle: "राष्ट्रीय साइबर हेल्पलाइन: 1930",
    helplineCallBtn: "कॉल करें",
    disclaimer: "महत्वपूर्ण: यह ऐप किसी कॉलर को 'वेरीफाई' नहीं करता। यह केवल धोखाधड़ी के पैटर्न पहचानता है।",

    // Checklist Screen
    checklistTitle: "कॉल सुरक्षा जांच",
    stepText: "कदम",
    ofText: "का",
    yesBtn: "हाँ (YES)",
    noBtn: "नहीं (NO)",
    pauseBreatheBtn: "रुकें और गहरी सांस लें",
    pauseModalTitle: "एक शांत सांस लें",
    pauseModalDesc: "धोखेबाज हमेशा आपको डराते हैं और जल्दबाजी करवाते हैं। आपके पास सोचने का पूरा समय है। कॉल काटने से कुछ भी बुरा नहीं होगा।",
    pauseModalContinue: "मैं आगे बढ़ने के लिए तैयार हूँ",
    readAloud: "आवाज में सुनें",
    stopAudio: "आवाज रोकें",

    // 5 Checklist Questions
    questions: [
      {
        id: 1,
        question: "क्या वे आपके साथ वीडियो कॉल पर हैं?",
        subtext: "धोखेबाज फर्जी पुलिस स्टेशन या वर्दी दिखाकर वीडियो कॉल पर डराते हैं।"
      },
      {
        id: 2,
        question: "क्या उन्होंने कहा कि आप परिवार को नहीं बता सकते या कॉल नहीं कर सकते?",
        subtext: "धोखेबाज आपको अकेला करना चाहते हैं ताकि आपका कोई परिचित आपको सचेत न कर सके।"
      },
      {
        id: 3,
        question: "क्या वे आपके खाते को 'सत्यापित' या 'सुरक्षित' करने के लिए पैसे ट्रांसफर करने को कह रहे हैं?",
        subtext: "कोई भी सरकारी एजेंसी या बैंक 'वेरिफिकेशन' के नाम पर पैसे नहीं मांगता।"
      },
      {
        id: 4,
        question: "क्या उन्होंने सीबीआई, पुलिस, कस्टम्स, नारकोटिक्स या TRAI होने का दावा किया?",
        subtext: "अपराधी खुद को बड़े सरकारी अफसर बताकर बुजुर्गों को निशाना बनाते हैं।"
      },
      {
        id: 5,
        question: "क्या वे गिरफ्तारी की धमकी दे रहे हैं या कॉल पर बने रहने के लिए कह रहे हैं?",
        subtext: "भारतीय कानून में 'डिजिटल अरेस्ट' नाम का कोई कानून नहीं है।"
      }
    ],

    // Verdicts
    verdictRedTitle: "यह धोखाधड़ी (SCAM) है!",
    verdictRedSub: "उच्च जोखिम पाया गया",
    verdictRedMessage: "यह धोखाधड़ी है। कोई 'डिजिटल अरेस्ट' नहीं होता। तुरंत कॉल काट दें और कोई पैसा न भेजें।",
    verdictAmberTitle: "सावधान रहें!",
    verdictAmberSub: "संदिग्ध चेतावनी संकेत मिले हैं",
    verdictAmberMessage: "कॉल में कुछ संदिग्ध बातें हैं। किसी भी खाते में पैसे न भेजें और न ही कोई गोपनीय जानकारी दें। पहले अपने बच्चों या परिवार से बात करें।",
    verdictGreenTitle: "कम जोखिम, लेकिन सतर्क रहें",
    verdictGreenSub: "सुरक्षा सलाह",
    verdictGreenMessage: "धोखाधड़ी के सीधे संकेत नहीं दिखे, लेकिन हमेशा याद रखें: भारतीय पुलिस या बैंक कभी भी फ़ोन पर पैसे ट्रांसफर करने की मांग नहीं करते।",
    safeReassurance: "आप पूरी तरह सुरक्षित हैं। आपका कुछ नहीं खोया है।",
    retakeChecklist: "दोबारा जांचें",

    // Family Screen
    familyTitle: "परिवार को सतर्क करें",
    familySubtitle: "मुसीबत के समय अपने बच्चों या विश्वसनीय परिजनों को एक क्लिक में WhatsApp संदेश भेजें।",
    addContact: "नया संपर्क जोड़ें",
    contactName: "नाम (जैसे: बेटी प्रिया / बेटा राहुल)",
    contactPhone: "मोबाइल नंबर (10 अंक)",
    saveContact: "सहेजें",
    editContacts: "संपर्क बदलें",
    callerDetailsLabel: "संदिग्ध कॉलर नंबर / एजेंसी (वैकल्पिक)",
    callerDetailsPlaceholder: "जैसे: 9876543210 या 'फर्जी CBI इंस्पेक्टर'",
    alertFamilyBigBtn: "परिवार को WhatsApp अलर्ट भेजें",
    whatsappMessagePrefix: "जरूरी सूचना: मुझे एक संदिग्ध 'डिजिटल अरेस्ट' कॉल आ रहा है। कृपया मुझे तुरंत कॉल करें। मुझे किसी को भी पैसे ट्रांसफर न करने दें।",
    guardianCardTitle: "परिवार सुरक्षा कवच",
    alertSentSuccessTitle: "अलर्ट तैयार है!",
    alertSentSuccessDesc: "WhatsApp खुल रहा है। संदेश भेजने के बाद कृपया अपने फ़ोन के पास रहें, परिवार तुरंत संपर्क करेगा।",
    noContactsYet: "कृपया पहले अपने कम से कम एक विश्वसनीय परिवार सदस्य का नंबर जोड़ें।",

    // Drill Screen
    drillTitle: "डिजिटल अरेस्ट अभ्यास",
    drillSubtitle: "फर्जी कॉल से बचने का सुरक्षित अभ्यास (सिमुलेशन)",
    drillQuestionLabel: "धोखेबाज की चाल:",
    drillChoiceLabel: "आप क्या करेंगे?",
    wellDone: "शाबाश! बिल्कुल सही फैसला।",
    scamTrap: "सावधान! यह धोखेबाजों का जाल है।",
    nextStepBtn: "अगला कदम",
    drillCompletedTitle: "अभ्यास पूरा हुआ!",
    drillScoreLabel: "आपका सुरक्षा स्कोर:",
    restartDrillBtn: "फिर से अभ्यास करें",

    // 3 Golden Rules
    threeRulesTitle: "भारतीय बुजुर्गों के लिए 3 सुनहरे नियम:",
    rule1Title: "1. 'डिजिटल अरेस्ट' नाम का कोई कानून नहीं है",
    rule1Desc: "भारत में कोई भी अदालत या पुलिस वीडियो कॉल पर किसी को गिरफ्तार नहीं करती।",
    rule2Title: "2. कोई एजेंसी गोपनीयता की मांग नहीं करती",
    rule2Desc: "असली पुलिस कभी नहीं कहेगी कि आप अपने बेटे, बेटी या वकील से बात न करें।",
    rule3Title: "3. पैसे ट्रांसफर से कोई सत्यापन नहीं होता",
    rule3Desc: "सरकारी विभाग कभी भी 'सुरक्षित खाते' में पैसे जमा करने को नहीं कहते।"
  },

  en: {
    // Header & Meta
    appName: "Honey Shield",
    appSubtitle: "Senior Fraud Shield",
    langToggle: "हिंदी",
    back: "Go Back",
    home: "Home",

    // Home Screen
    welcomeTitle: "Welcome, you are safe",
    welcomeSubtitle: "नमस्ते, आप सुरक्षित हैं",
    welcomeDescription: "We are here to keep your phone, family, and pension peaceful.",
    activeGuardTitle: "Active Guard",
    activeGuardSubtitle: "Shield is listening quietly • You are protected",

    // 3 Big Main Buttons
    btnCallCameIn: "Call came in",
    btnAlertFamily: "Alert family",
    btnPractice: "Practice",

    // Reassurance & Helplines
    noHurryTitle: "No hurry, no worry",
    noHurryDesc: "Real banks and police officers will never demand fast money over phone calls.",
    helplineTitle: "National Cyber Helpline: 1930",
    helplineCallBtn: "Call",
    disclaimer: "Notice: This app never claims to verify callers. It only flags scam patterns.",

    // Checklist Screen
    checklistTitle: "Call Safety Checklist",
    stepText: "Step",
    ofText: "of",
    yesBtn: "YES",
    noBtn: "NO",
    pauseBreatheBtn: "Need a moment? Pause and breathe.",
    pauseModalTitle: "Take a Calm Breath",
    pauseModalDesc: "Scammers always try to rush and terrify you. You have all the time in the world. Nothing bad will happen if you hang up and wait.",
    pauseModalContinue: "I am ready to continue",
    readAloud: "Listen Aloud",
    stopAudio: "Stop Voice",

    // 5 Checklist Questions
    questions: [
      {
        id: 1,
        question: "Are they on a video call with you?",
        subtext: "Fraudsters dress up in fake uniforms and stage fake police stations on video."
      },
      {
        id: 2,
        question: "Did they say you cannot tell or call your family?",
        subtext: "Scammers try to isolate you so your loved ones cannot intervene."
      },
      {
        id: 3,
        question: "Are they asking you to transfer money to 'verify' or 'secure' your account?",
        subtext: "No Indian authority or bank ever asks for money transfers for verification."
      },
      {
        id: 4,
        question: "Did they claim to be CBI, police, Customs, Narcotics or TRAI?",
        subtext: "Impersonating high-ranking central agency officers is their primary weapon."
      },
      {
        id: 5,
        question: "Are they threatening arrest or telling you to stay on the call?",
        subtext: "There is absolutely no concept of 'digital arrest' in Indian law."
      }
    ],

    // Verdicts
    verdictRedTitle: "THIS IS A SCAM",
    verdictRedSub: "High Risk Detected",
    verdictRedMessage: "This is a scam. There is no 'digital arrest'. Cut the call right now and do not send any money.",
    verdictAmberTitle: "BE CAREFUL",
    verdictAmberSub: "Warning Signs Detected",
    verdictAmberMessage: "Warning signs detected. Do not share any OTP or transfer funds. Contact your family right away.",
    verdictGreenTitle: "LOW RISK - STAY VIGILANT",
    verdictGreenSub: "Precautionary Note",
    verdictGreenMessage: "No direct scam patterns detected, but remember: Real police officers never ask for money or secret codes over phone.",
    safeReassurance: "You are completely safe. Nothing is lost.",
    retakeChecklist: "Check Again",

    // Family Screen
    familyTitle: "Alert Family Members",
    familySubtitle: "Store 2-3 trusted contacts so you can alert them via WhatsApp with one big tap.",
    addContact: "Add Contact",
    contactName: "Name (e.g. Daughter Priya / Son Rahul)",
    contactPhone: "Mobile Number (10 digits)",
    saveContact: "Save Contact",
    editContacts: "Edit Contacts",
    callerDetailsLabel: "Caller Number / Claimed Agency (optional)",
    callerDetailsPlaceholder: "e.g., 9876543210 or 'Fake CBI Officer'",
    alertFamilyBigBtn: "Alert Family on WhatsApp",
    whatsappMessagePrefix: "URGENT: I am getting a 'digital arrest' call. Please call me right now. Do NOT let me transfer any money.",
    guardianCardTitle: "Family Safety Guardian",
    alertSentSuccessTitle: "Alert Dispatched!",
    alertSentSuccessDesc: "WhatsApp opened. Please keep your phone reachable, your family will call you back right away.",
    noContactsYet: "Please add at least one trusted family contact below.",

    // Drill Screen
    drillTitle: "Digital Arrest Simulation",
    drillSubtitle: "Safely practice rejecting fake officer calls",
    drillQuestionLabel: "Scammer says:",
    drillChoiceLabel: "How do you respond?",
    wellDone: "Well done! Exactly the right response.",
    scamTrap: "Danger! This is a scam trap.",
    nextStepBtn: "Next Step",
    drillCompletedTitle: "Practice Complete!",
    drillScoreLabel: "Your Safety Score:",
    restartDrillBtn: "Practice Again",

    // 3 Golden Rules
    threeRulesTitle: "3 Golden Rules for Every Indian Elder:",
    rule1Title: "1. No 'Digital Arrest' Exists in Indian Law",
    rule1Desc: "Courts and police do not conduct arrests or trials over Skype or WhatsApp video.",
    rule2Title: "2. No Agency Demands Secrecy",
    rule2Desc: "Real police will never bar you from calling your children, lawyer, or relatives.",
    rule3Title: "3. No Verification by Money Transfer",
    rule3Desc: "Authorities never require you to deposit funds into a 'Reserve Bank verification account'."
  }
};
