import { Modal, Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React from 'react';

const SelectField = ({
  openSelectField,
  handleCloseSelectField,
  addDynamicField,
}) => {
  const [selectedTab, setSelectedTab] = React.useState('contact');

  //   Fields

  const fields = [
    {
      category: 'contact',
      Label: 'Contact',
      fields: [
        {
          fieldText: 'Full name',
          code: 'contact.fullName',
        },
        {
          fieldText: 'First name',
          code: 'contact.firstName',
        },
        {
          fieldText: 'Last name',
          code: 'contact.lastName',
        },
        {
          fieldText: 'Associated company',
          code: 'contact.companyName',
        },
        {
          fieldText: 'Email address',
          code: 'contact.email',
        },
        {
          fieldText: 'Phone number',
          code: 'contact.phone',
        },
      ],
    },
    {
      category: 'company',
      Label: 'Company',
      fields: [
        {
          fieldText: 'Company name',
          code: 'company.companyName',
        },
        {
          fieldText: 'Company ABN',
          code: 'company.abn',
        },
        {
          fieldText: 'Company address',
          code: 'company.address',
        },
        {
          fieldText: 'Company email',
          code: 'company.ownerEmail',
        },
        {
          fieldText: 'Company owner name',
          code: 'company.ownerName',
        },
      ],
    },
  ];

  const handleSwitchTabs = (_event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSelectField = (fieldCode) => {
    addDynamicField(fieldCode);
    handleCloseSelectField();
  };

  return (
    <Modal open={openSelectField} onClose={handleCloseSelectField}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { md: 400, xs: '80%' },
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleSwitchTabs}>
              {fields.map((field) => (
                <Tab
                  label={field.Label}
                  value={field.category}
                  key={field.category}
                />
              ))}
            </TabList>
          </Box>
          {fields.map((field) => {
            return (
              <TabPanel value={field.category} key={field.category}>
                {field.fields.map((f) => {
                  return (
                    <Box key={f.code}>
                      <Typography
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleSelectField(f.code)}
                      >
                        {f.fieldText}
                      </Typography>
                    </Box>
                  );
                })}
              </TabPanel>
            );
          })}
        </TabContext>
      </Box>
    </Modal>
  );
};

export default SelectField;
