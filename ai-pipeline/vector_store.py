from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')
index = faiss.IndexFlatL2(384)

def store_vectors(texts):
    embeddings = model.encode(texts)
    index.add(np.array(embeddings))
