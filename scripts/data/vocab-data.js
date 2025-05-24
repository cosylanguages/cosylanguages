const vocabData = {
  COSYenglish: {
    1: ["Hello", "Goodbye", "Yes", "No", "Thank you", "You're welcome"],
    2: ["Boy", "Girl", "Teacher", "Student", "Woman", "Man", "Person", "Thing", "What", "Who", "Nice to meet you", "For me", "Drink", "No problem"],
    3: ["Mother", "Father", "Son", "Daughter", "Sister", "Brother", "Husband", "Wife", "Friend"],
    4: ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
    5: ["Good", "Bad", "Easy", "Difficult", "Boring", "Interesting", "Big", "Small", "Hot", "Cold", "Cheap", "Expensive"],
    6: ["Iced", "Green", "Orange", "Red", "White", "Apple", "Pink", "Black"],
    7: ["Russia", "The UK", "Italy", "Germany", "Greece", "China", "France", "The USA", "Russian", "Greek", "German", "French", "Italian", "American", "British", "English", "Chinese"],
    8: ["Police officer", "Policeman", "Policewoman", "Businessperson", "Businesswoman", "Businessman", "Singer", "Chef", "Cook", "Firefighter", "Actor", "Actress", "Waiter", "Waitress", "Doctor", "Teacher", "Programmer", "Salesperson", "Salesman", "Saleswoman"]
  },
  COSYfrançais: {
    1: ["Bonjour", "Au revoir", "Oui", "Non", "Merci", "De rien"],
    2: ["Le garçon", "La fille", "Le professeur", "La professeur", "L'étudiant", "L'étudiante", "La femme", "L'homme", "La personne", "La chose", "Enchanté.e", "Pour moi", "La boisson", "Pas de problème"],
    3: ["La mère", "Le père", "Le fils", "La fille", "La sœur", "Le frère", "Le mari", "La femme", "L'ami", "L'amie"]
  },
  COSYitaliano: {
    1: ["Buongiorno", "Arrivederci", "Sì", "No", "Grazie", "Prego"], 
    2: ["Il ragazzo", "La ragazza", "Il professore", "La professoressa", "Lo studente", "La studentessa", "La donna", "L'uomo", "La persona", "La cosa", "Piacere", "Per me", "La bevanda", "Nessun problema"],
    3: ["la madre", "Il padre", "Il figlio", "La figlia", "La sorella", "Fratello", "Marito", "Moglie", "Amico/a"]
  },
  COSYespañol: {
    1: ["Hola", "Adiós", "Sí", "No", "Gracias", "De nada"],
    2: ["El chico", "La chica", "El profesor", "La profesora", "El estudiante", "La estudiante", "La mujer", "El hombre", "La persona", "La cosa", "Encantado/a", "Para mí", "La bebida", "No hay problema"]
  },
  COSYportuguês: {
    1: ["Olá", "Adeus", "Sim", "Não", "Obrigado", "De nada"],
    2: ["O rapaz", "A rapariga", "O professor", "A professora", "O estudante", "A estudante", "A mulher", "O homem", "A pessoa", "A coisa", "Prazer", "Para mim", "A bebida", "Sem problema"]
  },
  COSYdeutsch: {
    1: ["Hallo", "Auf Wiedersehen", "Ja", "Nein", "Danke", "Bitte"],
    2: ["Der Junge", "Das Mädchen", "Der Lehrer", "Die Lehrerin", "Der Student", "Die Studentin", "Die Frau", "Der Mann", "Die Person", "Das Ding", "Freut mich", "Für mich", "Das Getränk", "Kein Problem"]
  },
  ΚΟΖΥελληνικά: {
    1: ["Γειά σου", "Αντίο", "Όχι", "Ναι", "Ευχαριστώ", "Παρακαλώ"],
    2: ["Το αγόρι", "Το κορίτσι", "Ο δάσκαλος", "Η δασκάλα", "Ο μαθητής", "Η μαθήτρια", "Η γυναίκα", "Ο άντρας", "Το άτομο", "Το πράγμα", "Χαίρω πολύ", "Για μένα", "Το ποτό", "Κανένα πρόβλημα"],
    3: ["Μητέρα", "Πατέρας", "Γιος", "Κόρη", "Αδερφή", "Αδερφός", "Σύζυγος", "Σύζυγος", "Φίλος/Φίλη"]
  },
  ТАКОЙрусский: {
    1: ["Привет", "До свидания", "Да", "Нет", "Спасибо", "Пожалуйста"],
    2: ["Мальчик", "Девочка", "Учитель", "Учительница", "Студент", "Студентка", "Женщина", "Мужчина", "Человек", "Вещь", "Приятно познакомиться", "Для меня", "Напиток", "Нет проблем"]
  },
  ԾՈՍՅհայկական: {
    1: ["Բարև", "Ցտեսություն", "Այո", "Ոչ", "Շնորհակալություն", "Խնդրեմ"],
    2: ["Տղա", "Աղջիկ", "Ուսուցիչ", "Ուսուցչուհի", "Ուսանող", "Ուսանողուհի", "Կին", "Տղամարդ", "Անձ", "Բան", "Ուրախ եմ ձեզ հետ ծանոթանալու համար", "Ինձ համար", "Խմիչք", "Ոչ մի խնդիր"]
  }
};
