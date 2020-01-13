package com.demo.springboot.rest;

import com.demo.springboot.domain.dto.BubblesortMessageDto;
import com.demo.springboot.domain.dto.BubblesortResultDto;
import com.demo.springboot.service.impl.BubblesortService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/api")
public class BubblesortApiController {
    private static final Logger LOGGER = LoggerFactory.getLogger(BubblesortApiController.class);
    @Autowired
    private BubblesortService bubblesortService;

    @RequestMapping(value = "/bubblesort", method = RequestMethod.POST)
    public ResponseEntity<Void> sort(@RequestBody BubblesortMessageDto bubblesortMessageDto){
        LOGGER.info("### wysłano do zakodowania: {}", bubblesortMessageDto.getBubblesort());
        bubblesortService.setBubblesortMessage(bubblesortMessageDto);
        LOGGER.info("### Wiadmosc : {}", bubblesortService.bubblesortResult());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/bubblesort", method = RequestMethod.GET)
    public ResponseEntity<BubblesortResultDto> getBubblesortResult(){
        final BubblesortResultDto bubblesortResult = bubblesortService.bubblesortResult();
        //resultDto.setResult(baconService.encodeResult());
        LOGGER.info("### Odpowiedz serwera: {}", bubblesortResult.getBubblesortResult());
        return new ResponseEntity<>(bubblesortResult,HttpStatus.OK);
    }
}
