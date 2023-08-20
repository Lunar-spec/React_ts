import React, { useState } from 'react';
import { Collapse, List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import indigo from '@mui/material/colors/indigo';

const DepartmentList: React.FC = () => {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

    const departmentData = [
        {
            department: 'customer_service',
            sub_departments: ['support', 'customer_success'],
        },
        {
            department: 'design',
            sub_departments: ['graphic_design', 'product_design', 'web_design'],
        },
    ];

    const handleExpandClick = (department: string) => {
        setExpanded((prevExpanded) => (prevExpanded === department ? null : department));
    };

    const handleDepartmentCheckboxClick = (department: string) => {
        setSelected((prevSelected) => {
            const updatedSelection: { [key: string]: boolean } = { ...prevSelected };
            const isSelected = prevSelected[department];
            updatedSelection[department] = !isSelected;

            departmentData
                .find((dept) => dept.department === department)
                ?.sub_departments.forEach((subDept) => {
                    updatedSelection[subDept] = !isSelected;
                });
            return updatedSelection;
        });
    };

    return (
        <List>
            {departmentData.map((dept) => (
                <div key={dept.department}>
                    <ListItem button onClick={() => handleExpandClick(dept.department)} >
                        <ListItemIcon>
                            <Checkbox
                                checked={selected[dept.department] || false}
                                style={{ color: indigo[600] }}
                                onClick={() => handleDepartmentCheckboxClick(dept.department)}
                            />
                        </ListItemIcon>
                        <ListItemText primary={dept.department} />
                        {expanded === dept.department ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={expanded === dept.department} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {dept.sub_departments.map((subDept) => (
                                <ListItem
                                    key={subDept}
                                    button
                                    style={{ paddingLeft: '30px' }}
                                    onClick={() => handleDepartmentCheckboxClick(subDept)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={selected[subDept] || false}
                                            style={{ color: indigo[600] }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={subDept} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </div>
            ))}
        </List>
    );
};

export default DepartmentList;
