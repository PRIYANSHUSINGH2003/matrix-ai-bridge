import os
import torch
from datasets import load_dataset, Dataset
from transformers import (
    BertTokenizerFast,
    BertForSequenceClassification,
    Trainer,
    TrainingArguments,
    DataCollatorWithPadding,
)

# Sample training data (can be replaced with a CSV or other sources)
training_data = {
    "text": [
        "Schedule a meeting for tomorrow",
        "Remind me to buy groceries",
        "Send the report to my manager",
        "What’s the weather today?",
        "Play some music",
        "Book a flight to New York",
    ],
    "label": [0, 1, 2, 3, 4, 5]  # Each label is an intent
}
intent_labels = ["schedule", "reminder", "send_report", "weather", "music", "book_flight"]

# Load dataset
dataset = Dataset.from_dict(training_data)

# Tokenizer and model
tokenizer = BertTokenizerFast.from_pretrained("bert-base-uncased")
model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=len(intent_labels))

# Tokenization
def tokenize(batch):
    return tokenizer(batch["text"], truncation=True)

tokenized_dataset = dataset.map(tokenize, batched=True)
tokenized_dataset = tokenized_dataset.rename_column("label", "labels")
tokenized_dataset.set_format("torch")

# Data collator
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

# Training arguments
training_args = TrainingArguments(
    output_dir="./model_output",
    evaluation_strategy="no",
    per_device_train_batch_size=4,
    num_train_epochs=5,
    save_steps=10,
    logging_dir="./logs",
    logging_steps=5,
    load_best_model_at_end=False
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    tokenizer=tokenizer,
    data_collator=data_collator
)

# Fine-tune the model
if __name__ == "__main__":
    trainer.train()
    model.save_pretrained("./model_output")
    tokenizer.save_pretrained("./model_output")
    print("✅ Fine-tuning complete. Model saved to ./model_output")
