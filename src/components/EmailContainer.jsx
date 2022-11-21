import {
  Button,
  ClickAwayListener,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { body, subject } from '../EmailTemplates/template1';
import TargetInfo from './TargetInfo';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import SelectField from './SelectField';
import getRandomIndex from '../utils/randomUtils';
import contacts from '../data/contactDatabase';
import companies from '../data/companyDatabase';
import { regexReplaceTextFunction } from '../utils/RegExUtils';
import DisplayFields from './DisplayFields';

const EmailContainer = ({ handleGenerateEmail }) => {
  // value: body or subject - should be enum in typescript
  // this will be the target for our select field function
  // select field function adds contact/company fields
  // which will be processed by regex to have dynamic emails sent
  const [selectedField, setSelectedField] = React.useState('');

  // toggling display dynamic field names
  const [displayFields, setDisplayFields] = React.useState(false);

  // the dynamic fields
  const [dynamicFieldsArray, setDynamicFieldsArray] = React.useState([]);

  // detecting which index of string we are in
  const subjectInputRef = React.useRef();
  const bodyInputRef = React.useRef();
  const [selectionStart, setSelectionStart] = React.useState();

  //   textField values
  const [subjectText, setSubjectText] = React.useState('');
  const [bodyText, setBodyText] = React.useState('');

  // add field modal controls
  const [openSelectField, setOpenSelectField] = React.useState(false);

  // field to be added

  //   setting defaults
  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      setSubjectText(subject);
      setBodyText(body);
    }

    return () => {
      mounted = false;
      setSubjectText('');
      setBodyText('');
    };
  }, []);

  // for demo only - dyamic field list resets when
  // email text changes
  React.useEffect(() => {
    if (subjectText || bodyText) {
      setDisplayFields(false);
    }
  }, [bodyText, subjectText]);

  // detecting which index of string we are in

  const updateSelectionStart = (selected) => {
    setSelectedField(selected);
    let inputRef = selected === 'subject' ? subjectInputRef : bodyInputRef;

    // if we select at beginning of string, index will be 0
    // which is falsy, therefore, returning a -1 will be a good flag
    // to say we are targeting before the current array
    if (inputRef.current) {
      setSelectionStart(inputRef.current.selectionStart || -1);
    }
  };

  //   changing textfield values

  const handleSubjectChange = (event) => {
    setSubjectText(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyText(event.target.value);
  };

  const handleClear = () => {
    setSubjectText('');
    setBodyText('');
    setSelectedField('');
    handleResetEmail();
    setDisplayFields(false);
  };

  // fields
  // company - companyName, ownerName,

  // this is a test - will just add "test" at the end of a string
  // edit - test works ( it adds new string to selectedField)
  // next task is to detect which index to add to
  const addDynamicField = (field) => {
    // refactor for efficiency
    const targetField = selectedField === 'subject' ? subjectText : bodyText;

    // determines whether to add space between each word
    const previousIndex = selectionStart ? selectionStart - 1 : 0;
    const leftHandle =
      targetField[previousIndex] !== ' ' && targetField[previousIndex - 1]
        ? ' {{'
        : '{{';
    const nextIndex = selectionStart || 0;
    const rightHandle = targetField[nextIndex] === ' ' ? '}}' : '}} ';

    const newInputValue = leftHandle + field + rightHandle;

    // fix: determine if we need to add space in between

    // insert at beginning if selected is start of string
    const updatedTargetString = !targetField[previousIndex - 1]
      ? newInputValue + targetField
      : targetField.slice(0, selectionStart) +
        newInputValue +
        targetField.slice(selectionStart);

    if (selectedField === 'subject') {
      setSubjectText(updatedTargetString);
    } else if (selectedField === 'body') {
      setBodyText(updatedTargetString);
    }

    // if new field added, new index should be end of newly added textcode
    // calculated by getting old selectionStart + length of added field
    // also need to add the curly braces and space which is 6
    // - 1 since  we only need one space between each

    const endOfNewString = selectionStart
      ? selectionStart + field.length + 5
      : field.length + 5;

    setSelectionStart(endOfNewString);
  };

  const handleOpenSelectField = (field) => {
    setSelectedField(field);

    // fix for bug if they do not click on the text field before adding dynamic field
    // the current selectionRef would be 0
    // set in to length so we will add to the end of string
    if (!selectionStart) {
      setSelectionStart(
        field === 'subject' ? subjectText.length : bodyText.length
      );
    }
    setOpenSelectField(true);
  };

  const handleCloseSelectField = () => {
    setOpenSelectField(false);
  };

  const handleResetEmail = () => {
    handleGenerateEmail(undefined);
  };

  const handleSendEmail = () => {
    // regex function here
    // assign values based on simulated database

    // get a random recipient
    // we will get a random index for this
    // getting a random recipient to simulate
    // that fields are dynamic instead
    // of just sending a static email text

    // for simulation purposes only
    // random contact but we will use an object from the contact document
    const selectedRecipientIndex = getRandomIndex(contacts.length);
    // random company but we will use company from company document
    // in our actual application
    const simulatedCompanyIndex = getRandomIndex(companies.length);
    // end of simulation code

    // if we have a recipient
    // get all fields in subject
    // get all fields in message

    if (contacts[selectedRecipientIndex] && companies[simulatedCompanyIndex]) {
      // test - logs only
      console.clear();
      console.log(contacts[selectedRecipientIndex]);
      console.log(companies[simulatedCompanyIndex]);

      // call regex function
      // we are using an array but this will be an
      //  object in the actual application

      // get recipient email from selected contact
      //  this will be from an object in the actual application
      // change keys to actual object keys
      const recipientEmail = contacts[selectedRecipientIndex].emailAddress;

      const generatedSubject = regexReplaceTextFunction(subjectText, {
        contactFullName: contacts[selectedRecipientIndex].fullName || '--',
        contactFirstName: contacts[selectedRecipientIndex].firstName || '--',
        contactLastName: contacts[selectedRecipientIndex].lastName || '--',
        contactCompanyName:
          contacts[selectedRecipientIndex].associatedCompany || '--',
        contactEmail: contacts[selectedRecipientIndex].emailAddress || '--',
        contactPhone: contacts[selectedRecipientIndex].phone || '--',
        companyCompanyName:
          companies[simulatedCompanyIndex].companyName || '--',
        companyAbn: companies[simulatedCompanyIndex].companyABN || '--',
        companyAddress: companies[simulatedCompanyIndex].companyAddress || '--',
        companyOwnerEmail: companies[simulatedCompanyIndex].ownerEmail || '--',
        companyOwnerName: companies[simulatedCompanyIndex].ownerName || '--',
        companyOwnerFirstName:
          companies[simulatedCompanyIndex].ownerFirstName || '--',
        companyOwnerLastName:
          companies[simulatedCompanyIndex].ownerLastName || '--',
      });

      const generatedEmailBody = regexReplaceTextFunction(bodyText, {
        contactFullName: contacts[selectedRecipientIndex].fullName || '--',
        contactFirstName: contacts[selectedRecipientIndex].firstName || '--',
        contactLastName: contacts[selectedRecipientIndex].lastName || '--',
        contactCompanyName:
          contacts[selectedRecipientIndex].associatedCompany || '--',
        contactEmail: contacts[selectedRecipientIndex].emailAddress || '--',
        contactPhone: contacts[selectedRecipientIndex].phone || '--',
        companyCompanyName:
          companies[simulatedCompanyIndex].companyName || '--',
        companyAbn: companies[simulatedCompanyIndex].companyABN || '--',
        companyAddress: companies[simulatedCompanyIndex].companyAddress || '--',
        companyOwnerEmail: companies[simulatedCompanyIndex].ownerEmail || '--',
        companyOwnerName: companies[simulatedCompanyIndex].ownerName || '--',
        companyOwnerFirstName:
          companies[simulatedCompanyIndex].ownerFirstName || '--',
        companyOwnerLastName:
          companies[simulatedCompanyIndex].ownerLastName || '--',
      });

      // test only
      // handleGenerateEmail('test subject', 'test message', 'test recipient');

      // test 2 - pass contact email based on random index
      // handleGenerateEmail('test subject', 'test message', recipientEmail);

      // working version
      handleGenerateEmail(generatedSubject, generatedEmailBody, recipientEmail);
    }
  };

  const handleToggleFields = () => {
    const emailContent = subjectText + ' ' + bodyText;

    var re = /(?:^|\W){{(\w+)(?!\w)/g,
      match,
      matches = [];

    while ((match = re.exec(emailContent))) {
      matches.push(match[1]);
    }

    setDynamicFieldsArray(matches);

    setDisplayFields((showFields) => !showFields);
  };

  return (
    <ClickAwayListener onClickAway={() => setSelectedField('')}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography fontSize="20px" fontWeight="bold">
            Email template
          </Typography>
        </Grid>
        {/* testing */}

        <TargetInfo
          selectedField={selectedField}
          selectionStart={selectionStart}
        />

        <Grid item xs={12}>
          <Typography fontWeight="bold">Subject</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={subjectInputRef}
            fullWidth
            onSelect={() => updateSelectionStart('subject')}
            onChange={handleSubjectChange}
            value={subjectText}
            placeholder="Enter subject..."
            InputProps={{
              endAdornment: (
                <Tooltip title="Add field">
                  <IconButton onClick={() => handleOpenSelectField('subject')}>
                    <StorageOutlinedIcon
                      color={selectedField === 'subject' ? 'info' : 'disabled'}
                    />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography fontWeight="bold">Message</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          textAlign="right"
          // display={selectedField === 'body' ? 'auto' : 'none'}
        >
          <Tooltip title="Add field">
            <IconButton onClick={() => handleOpenSelectField('body')}>
              <StorageOutlinedIcon
                color={selectedField === 'body' ? 'info' : 'disabled'}
              />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item xs={12}>
          <TextField
            inputRef={bodyInputRef}
            fullWidth
            onSelect={() => updateSelectionStart('body')}
            onChange={handleBodyChange}
            value={bodyText}
            maxRows={25}
            minRows={5}
            multiline
            placeholder="Enter message..."
          />
        </Grid>

        {/* send button simulates the emails that contacts would see */}
        <Grid item xs={12} textAlign="right">
          <Button
            disabled={!subjectText && !bodyText}
            variant="outlined"
            sx={{ marginRight: '10px' }}
            onClick={handleToggleFields}
          >
            {displayFields ? 'Hide' : 'Display'} Fields
          </Button>

          <Tooltip title="Clears email template">
            <Button
              variant="outlined"
              sx={{ marginRight: '10px' }}
              onClick={handleClear}
            >
              Clear template
            </Button>
          </Tooltip>
          <Tooltip title="Clears generated email">
            <Button
              variant="outlined"
              sx={{ marginRight: '10px' }}
              onClick={handleResetEmail}
            >
              New Email
            </Button>
          </Tooltip>
          <Tooltip title="Simulates database fetch and generates email">
            <Button variant="contained" onClick={handleSendEmail}>
              Send
            </Button>
          </Tooltip>
        </Grid>
        <SelectField
          openSelectField={openSelectField}
          handleCloseSelectField={handleCloseSelectField}
          addDynamicField={addDynamicField}
        />
        {/* displays fields for mapping db data */}
        {displayFields && (
          <Grid item xs={12}>
            <DisplayFields dynamicFieldsArray={dynamicFieldsArray} />
          </Grid>
        )}
      </Grid>
    </ClickAwayListener>
  );
};

export default EmailContainer;
