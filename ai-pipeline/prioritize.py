from transformers import pipeline

classifier = pipeline("zero-shot-classification")

def prioritize(text):
    labels = ["urgent", "important", "low"]
    return classifier(text, candidate_labels=labels)
