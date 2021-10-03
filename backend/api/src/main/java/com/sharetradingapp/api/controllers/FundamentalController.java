package com.sharetradingapp.api.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.json.*;

@RestController
@RequestMapping("api/v1")
public class FundamentalController {

	@PostMapping("")
	public ResponseEntity<Object> sayHello(@RequestBody String request) {
		JSONObject json = new JSONObject(request);
		System.out.println(json.toString(4));
		return new ResponseEntity<>(request.toString(), HttpStatus.OK);
	}

}
