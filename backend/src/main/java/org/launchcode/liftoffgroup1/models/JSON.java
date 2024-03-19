package org.launchcode.liftoffgroup1.models;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;

public class JSON {

    //converts a JSON file to a HashMap. DOES NOT FUNCTION, if needed copy it and change the filePath/fileName to fit the need
    public static LinkedHashMap<String, String> convertJSONFileToHashMap () throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(new File("filePath/fileName"), LinkedHashMap.class);
    }

    //takes an input of raw JSON and returns a HashMap. does NOT need the JSON to be converted to a string
    public static LinkedHashMap<String, String> convertJSONInputToHashMap (JSON json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json.toString(), LinkedHashMap.class);
    }

    //takes an input HashMap and converts it into JSON
    public static JSON convertHashMapToJSON (HashMap<String, String> hashMap) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String output = objectMapper.writeValueAsString(hashMap);
        return objectMapper.readValue(output, JSON.class);
    }

    //takes an input HashMap and converts it into JSON as a string
    public static String convertHashMapToJSONString (HashMap<String, String> hashMap) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String output = objectMapper.writeValueAsString(hashMap);
        JSON json = objectMapper.readValue(output, JSON.class);
        return json.toString();
    }
    //@RestController maven to gradle api
}
