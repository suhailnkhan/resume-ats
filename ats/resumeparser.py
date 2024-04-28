import PyPDF2
import pathlib
import textwrap
import google.generativeai as genai
import os
from IPython.display import display
from IPython.display import Markdown

GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)
def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))
def pdf_to_text(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(pdf_path)
        page = reader.pages[0]
        text = page.extract_text()
        
    return text

def convert_to_dict(json_string):
    json_string = json_string.strip("'''")
    return json_string

def getChatGptRespose(resume , job_description):
    # for m in genai.list_models():
    #     if 'generateContent' in m.supported_generation_methods:
    #         print(m.name)
    model = genai.GenerativeModel('gemini-pro')
    promt = f'Act as a Hr manager hiring for a post of {job_description} and here is the resume of the candidate in text format {resume} .Go though the resume and match it with the job description and return me the response  which includes data like Matching percent with job description, What improvement are needed in resume and what are the best points about this resume . Return response in html format (Very Important) with proper formatting so that i can directly render it. Also add some line breaks i.e <br/> between Improvements Needed in Resume , Best Points About This Resume and Bold them '
    response = model.generate_content(promt)
    formatted_response = response.candidates[0].content.parts[0].text
    converted_dict = convert_to_dict(formatted_response)
    return converted_dict