package com.demo.springboot.service.impl;

import com.demo.springboot.domain.dto.BubblesortMessageDto;
import com.demo.springboot.domain.dto.BubblesortResultDto;
import com.demo.springboot.domain.entity.Bubblesort;
import org.springframework.stereotype.Service;

@Service
public class BubblesortServiceImpl implements BubblesortService {
    private String bubblesortStringMessage;
    private Bubblesort bubblesort;

    @Override
    public BubblesortResultDto bubblesortResult() {
        bubblesort = new Bubblesort(bubblesortStringMessage);
        return new BubblesortResultDto(bubblesort.sort());
    }

    @Override
    public void setBubblesortMessage(BubblesortMessageDto bubblesortMessageDto) {
        this.bubblesortStringMessage = bubblesortMessageDto.getBubblesort();
    }
}
