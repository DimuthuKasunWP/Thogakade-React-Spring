package lk.ijse.market.controller;

import lk.ijse.market.dto.ItemDTO;
import lk.ijse.market.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("market/v1/item")
@RestController
public class ItemController {

    @Autowired
    ItemService itemService;

    @PutMapping
    public boolean saveItem(@RequestBody ItemDTO itemDTO){
        return itemService.saveItem(itemDTO);
    }

    @DeleteMapping
    public boolean deleteItem(@RequestBody ItemDTO itemDTO){
        return itemService.deleteItem(itemDTO);
    }

    @PostMapping
    public boolean updateItem(@RequestBody ItemDTO itemDTO){
        return itemService.updateItem(itemDTO);
    }

    @GetMapping
    public Object find(@RequestParam(value="action",required=false) String action,
                       @RequestParam(value="id",required = false) Integer id,
                       @RequestParam(value="page",required = false) Integer page,
                       @RequestParam(value="size",required = false) Integer size){
        if(action!=null){
            switch (action){
                case "all":return itemService.findAll();
                case "search":return itemService.findById(id);
                case "page":return itemService.findByPage(page,size);
                case "last":return itemService.getLastItem();
                default:return itemService.findAll();
            }
        }else{
            return itemService.findAll();
        }

    }

}
