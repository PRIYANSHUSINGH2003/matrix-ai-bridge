import spacy
nlp = spacy.load("en_core_web_sm")

def recognize_intent(text):
    doc = nlp(text)
    return [(ent.text, ent.label_) for ent in doc.ents]
