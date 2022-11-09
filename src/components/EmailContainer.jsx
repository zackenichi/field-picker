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

const EmailContainer = () => {
  // value: body or subject - should be enum in typescript
  // this will be the target for our select field function
  // select field function adds contact/company fields
  // which will be processed by regex to have dynamic emails sent
  const [selectedField, setSelectedField] = React.useState('');

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

  // detecting which index of string we are in

  const updateSelectionStart = (selected) => {
    setSelectedField(selected);
    let inputRef = selected === 'subject' ? subjectInputRef : bodyInputRef;

    setSelectionStart(inputRef.current.selectionStart);
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
  };

  // fields
  // company - companyName, ownerName,

  // this is a test - will just add "test" at the end of a string
  // edit - test works ( it adds new string to selectedField)
  // next task is to detect which index to add to
  const addDynamicField = (field) => {
    if (selectedField === 'subject') {
      // this simply adds to the end of string
      // we need to insert new {{fieldName at selected string index}}
      // setSubjectText(subjectText + '{{test}}');

      // insert {{dynamicField}} in string
      // fix: added space between fields
      setSubjectText(
        subjectText.slice(0, selectionStart) +
          ' {{' +
          field +
          '}} ' +
          subjectText.slice(selectionStart)
      );
    } else if (selectedField === 'body') {
      setBodyText(
        bodyText.slice(0, selectionStart) +
          ' {{' +
          field +
          '}} ' +
          bodyText.slice(selectionStart)
      );
    }

    // if new field added, new index should be end of newly added textcode
    // calculated by getting old selectionStart + length of added field
    // also need to add the curly braces and space which is 6
    // - 1 since  we only need one space between each

    setSelectionStart(selectionStart + field.length + 5);
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
            variant="outlined"
            sx={{ marginRight: '10px' }}
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button variant="contained">Send</Button>
        </Grid>
        <SelectField
          openSelectField={openSelectField}
          handleCloseSelectField={handleCloseSelectField}
          addDynamicField={addDynamicField}
        />
      </Grid>
    </ClickAwayListener>
  );
};

export default EmailContainer;
