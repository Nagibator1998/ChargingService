package com.mycompany.chargingService.fapi.controller;

import com.mycompany.chargingService.fapi.models.ActiveSubscript;
import com.mycompany.chargingService.fapi.service.ActiveSubscriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/active-subscripts")
public class ActiveSubscriptController {

    private ActiveSubscriptService activeSubscriptService;

    @Autowired
    public ActiveSubscriptController(ActiveSubscriptService activeSubscriptService) {
        this.activeSubscriptService = activeSubscriptService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<ActiveSubscript>> getAllActiveSubscripts(){
        return ResponseEntity.ok(this.activeSubscriptService.getAllActiveSubscripts());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<ActiveSubscript> getActiveSubscriptById(@PathVariable(name = "id") Long id){
        ActiveSubscript activeSubscript = this.activeSubscriptService.getActiveSubscriptById(id);
        if(activeSubscript != null){
            return ResponseEntity.ok(activeSubscript);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ActiveSubscript> saveActiveSubscript(@RequestBody ActiveSubscript activeSubscript){
        ActiveSubscript savedActiveSubscript = this.activeSubscriptService.saveActiveSubscript(activeSubscript);
        if(savedActiveSubscript != null){
            return ResponseEntity.ok(savedActiveSubscript);
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteActiveSubscript(@PathVariable(name = "id") Long id){
        this.activeSubscriptService.deleteActiveSubscript(id);
    }
}
