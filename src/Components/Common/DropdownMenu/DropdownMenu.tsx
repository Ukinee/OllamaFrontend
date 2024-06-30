import React, {useState} from 'react';

interface DropdownMenuProps {
    items: string[];
    onSelect: (item: string) => void;
    onCreate: (item: string) => Promise<void>;
}

export function DropdownMenu({items, onSelect, onCreate}: DropdownMenuProps) {
    const [menuItems, setMenuItems] = useState<string[]>(items);
    const [newItem, setNewItem] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const handleSelect = (item: string) => {
        onSelect(item);
    };

    const handleAddItem = async () => {

        const newEntry = newItem.trim();

        if (newEntry && menuItems.includes(newEntry) == false) {
            setIsCreating(true);
            
            await onCreate(newEntry);

            setIsCreating(false);
            
            setMenuItems([...menuItems, newEntry]);
            setNewItem('');
        }
    };

    return (
        <div>
            <select onChange={(e) => handleSelect(e.target.value)}>
                {menuItems.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <div>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new item"
                />
                <button onClick={handleAddItem}>Add</button>
            </div>
        </div>
    );
};
