package com.mycompany.chargingService.backend.service.implementations;

import com.mycompany.chargingService.backend.entity.ActiveSubscript;
import com.mycompany.chargingService.backend.repository.ActiveSubscriptRepository;
import com.mycompany.chargingService.backend.service.ActiveSubscriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ActiveSubscriptServiceImpl implements ActiveSubscriptService {

    private ActiveSubscriptRepository activeSubscriptRepository;

    @Autowired
    public ActiveSubscriptServiceImpl(ActiveSubscriptRepository activeSubscriptRepository) {
        this.activeSubscriptRepository = activeSubscriptRepository;
    }

    @Override
    public ActiveSubscript saveActiveSubscript(ActiveSubscript activeSubscript) {
        return this.activeSubscriptRepository.save(activeSubscript);
    }

    @Override
    public void deleteActiveSubscript(Long id) {
        this.activeSubscriptRepository.deleteById(id);
    }

    @Override
    public ActiveSubscript setTimeNow(Long id) {
        this.activeSubscriptRepository.setTimeNow(id);
        return this.activeSubscriptRepository.findById(id).isPresent() ?
                this.activeSubscriptRepository.findById(id).get() : null;
    }

    @Override
    public int getTimesDifference(Long id) {
        return this.activeSubscriptRepository.getTimesDifference(id);
    }

    @Override
    public Iterable<ActiveSubscript> getAllActiveSubscripts() {
        return this.activeSubscriptRepository.findAll();
    }

    @Override
    public ActiveSubscript getActiveSubscriptById(Long id) {
        return this.activeSubscriptRepository.findById(id).isPresent() ?
                this.activeSubscriptRepository.findById(id).get() : null;
    }
}
