import React from 'react';

function parseXmlPosts(xmlString: string): any[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const eElements = xmlDoc.querySelectorAll('e'); // Select all 'e' elements
    const parsedData = [];
  
    eElements.forEach(eElement => {
        const id = parseInt(eElement.querySelector('id')?.textContent, 10);
        const post_title = eElement.querySelector('post_title').textContent;
        const post_time = eElement.querySelector('post_time').textContent;
        const post_content = eElement.querySelector('post_content').textContent;
        const visible = parseInt(eElement.querySelector('visible').textContent, 10);
        const post_autor = eElement.querySelector('post_autor').textContent;
  
        parsedData.push({
            id,
            title,
            postTime,
            postContent,
            visible,
            postAutor
        });
    });
  
    return parsedData;
  }
  
export default function prepare_api_response(response: any){
    const contentType = response.headers['content-type'];
  
    if (contentType && contentType.includes('application/json')) {
      console.log(response.data);
      return response.data;
    } else if (contentType && contentType.includes('application/xml')) {
      // You can handle XML data parsing here and return an array
      console.log(parseXmlPosts(response.data));
      return parseXmlPosts(response.data);
    } else {
      return response.data;
    }
  };