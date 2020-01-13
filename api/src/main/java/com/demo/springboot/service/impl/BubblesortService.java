package com.demo.springboot.service.impl;

import com.demo.springboot.domain.dto.BubblesortMessageDto;
import com.demo.springboot.domain.dto.BubblesortResultDto;

public interface BubblesortService {
    BubblesortResultDto bubblesortResult();
    void setBubblesortMessage(BubblesortMessageDto bubblesortMessageDto);
}
