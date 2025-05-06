from transformers import pipeline

summarizer = pipeline("summarization", model="t5-base")

def summarize(text):
    return summarizer(text, max_length=100, min_length=30, do_sample=False)[0]['summary_text']
