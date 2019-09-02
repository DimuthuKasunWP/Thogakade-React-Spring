package lk.ijse.market.service;


import lk.ijse.market.dto.ItemDTO;

import java.util.List;

public interface ItemService {

    public boolean saveItem(ItemDTO itemDTO);

    public List<ItemDTO> findAll();

    public ItemDTO findById(int id);

    public List<ItemDTO> findByPage(int page,int size);

    public boolean updateItem(ItemDTO itemDTO);

    public boolean deleteItem(ItemDTO itemDTO);

    public ItemDTO getLastItem();

}
