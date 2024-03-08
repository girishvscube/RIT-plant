



plant_info = [
    {
        "name": "bamboo",
        "scientific_name": "Bambusoideae (Subfamily)",
        "recognition": "Bamboo is recognized for its rapid growth, strength, and versatility. It is valued for various uses such as construction, food, medicine, papermaking, textiles, and ornamental purposes.",
        "discovery_year": "Prehistoric times",
        "first_identified": "Bamboo has been utilized by humans for thousands of years across various cultures. Its discovery predates recorded history and has been an integral part of human civilization for millennia."
    },
    {
        "name": "jackfruit",
        "scientific_name": "Artocarpus heterophyllus",
        "recognition": "Jackfruit is recognized for its large size, distinctive appearance, and sweet, tropical flavor. It is a popular fruit in many tropical regions and is used in a variety of culinary dishes.",
        "discovery_year": "Prehistoric times",
        "first_identified": "Jackfruit has been cultivated for thousands of years in South and Southeast Asia, where it is native. Its exact origins are uncertain, but it has been an important food source in the region for centuries."
    },
    {
        "name": "mango",
        "scientific_name": "Mangifera indica",
        "recognition": "Mango is recognized for its sweet and juicy fruit, distinctive aroma, and tropical flavor. It is one of the most popular fruits worldwide and is enjoyed fresh, in desserts, juices, and savory dishes.",
        "discovery_year": "Prehistoric times",
        "first_identified": "Mango has been cultivated for over 4,000 years in South Asia, where it is native. Ancient civilizations such as the Indus Valley Civilization and the Harappan civilization were known to cultivate mango trees."
    },
    {
        "name": "Nilgiri",
        "scientific_name": "Nilgiris",
        "recognition": "The Nilgiri Mountains are recognized for their breathtaking scenery, rich biodiversity, and cultural significance. They are home to numerous endemic plant and animal species, as well as indigenous communities.",
        "discovery_year": "Unknown",
        "first_identified": "The Nilgiri Mountains have been inhabited by indigenous peoples for thousands of years. European explorers and colonists first began to explore the region in the 17th century."
    },
    {
        "name": "tomato",
        "scientific_name": "Solanum lycopersicum",
        "recognition": "Tomato is recognized for its bright red color, juicy texture, and tangy flavor. It is a staple ingredient in many cuisines worldwide and is used in a wide variety of dishes, from salads and sauces to soups and sandwiches.",
        "discovery_year": "Pre-Columbian era",
        "first_identified": "The tomato is native to western South America and was first domesticated by indigenous peoples in the region over 2,000 years ago. It was introduced to Europe by Spanish explorers in the 16th century."
    }
]






from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing import image as keras_image
import numpy as np
from PIL import Image as PIL_Image 
from flask_cors import CORS

app = Flask(__name__)

CORS(app)  # Enable CORS for all routes

# Load the saved model
model = tf.keras.models.load_model('plant_classification_model.h5')

img_width, img_height = 150, 150  # Same dimensions as during training

@app.route('//predict_plant', methods=['POST'])
def predict_animal():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})

    image_file = request.files['image']
    img = PIL_Image.open(image_file)
    img = img.resize((img_width, img_height))
    img_array = keras_image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize the image data

    prediction = model.predict(img_array)
    predicted_index = np.argmax(prediction)
    predicted_plant_info = plant_info[predicted_index]

    return jsonify({
        'name': predicted_plant_info['name'],
        'scientific_name': predicted_plant_info['scientific_name'],
        'recognition': predicted_plant_info['recognition'],
        'discovery_year': predicted_plant_info['discovery_year'],
        'first_identified': predicted_plant_info['first_identified']
    })



if __name__ == '__main__':
    app.run(debug=True)
