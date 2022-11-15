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
          code: 'contactFullName',
        },
        {
          fieldText: 'First name',
          code: 'contactFirstName',
        },
        {
          fieldText: 'Last name',
          code: 'contactLastName',
        },
        {
          fieldText: 'Associated company',
          code: 'contactCompanyName',
        },
        {
          fieldText: 'Email address',
          code: 'contactEmail',
        },
        {
          fieldText: 'Phone number',
          code: 'contactPhone',
        },
      ],
    },
    {
      category: 'company',
      Label: 'Company',
      fields: [
        {
          fieldText: 'Company name',
          code: 'companyCompanyName',
        },
        {
          fieldText: 'Company ABN',
          code: 'companyAbn',
        },
        {
          fieldText: 'Company address',
          code: 'companyAddress',
        },
        {
          fieldText: 'Company email',
          code: 'companyOwnerEmail',
        },
        {
          fieldText: 'Company owner name',
          code: 'companyOwnerName',
        },
        {
          fieldText: 'Company owner name first name',
          code: 'companyOwnerFirstName',
        },
        {
          fieldText: 'Company owner name last name',
          code: 'companyOwnerLastName',
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
