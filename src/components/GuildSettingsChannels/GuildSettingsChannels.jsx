import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateChannels } from "../../redux/actions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuidv4 from "uuid/v4";
import _ from "lodash";
import SaveChangesBar from "../SaveChangesBar";
import "./GuildSettingsChannels.css";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function GuildSettingsChannels() {
  const channels = useSelector(
    ({ chatState }) => chatState.channels[chatState.activeGuild]
  );
  const { chatApiLoading: apiLoading, chatApiError: apiError } = useSelector(
    state => state.apiState
  );
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [saveChangesOpen, setSaveChangesOpen] = useState(false);
  const [saveChangesRequestClose, setSaveChangesRequestClose] = useState(false);
  const [originalList, setOriginalList] = useState(
    Object.entries(channels)
      .map(([channelId, channel]) => ({
        id: channelId,
        name: channel.name,
        position: channel.position,
        changingName: false
      }))
      .sort((a, b) =>
        a.position > b.position ? 1 : b.position > a.position ? -1 : 0
      )
  );
  const [list, setList] = useState(originalList);

  useEffect(() => {
    if (mounted) return;

    setMounted(true);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const newList = Object.entries(channels)
      .map(([channelId, channel]) => ({
        id: channelId,
        name: channel.name,
        position: channel.position,
        changingName: false
      }))
      .sort((a, b) =>
        a.position > b.position ? 1 : b.position > a.position ? -1 : 0
      );
    setOriginalList(newList);
    setList(newList);
  }, [channels, mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (!_.isEqual(originalList, list)) {
      if (!saveChangesOpen) {
        setSaveChangesOpen(true);
      }
    } else if (saveChangesOpen) {
      setSaveChangesRequestClose(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const saveChanges = () => {
    const addedChannels = _.differenceWith(list, originalList, _.isEqual)
      .filter(
        channel1 => !originalList.some(channel2 => channel1.id === channel2.id)
      )
      .map(channel => {
        const { changingName, ...newChannel } = channel;
        return newChannel;
      });

    const updatedChannels = _.differenceWith(list, originalList, _.isEqual)
      .filter(channel1 =>
        originalList.some(channel2 => channel1.id === channel2.id)
      )
      .map(channel => {
        const { changingName, ...newChannel } = channel;
        return newChannel;
      });

    const deletedChannels = _.differenceWith(originalList, list, _.isEqual)
      .filter(
        channel1 =>
          originalList.some(channel2 => channel1.id === channel2.id) &&
          !list.some(channel2 => channel1.id === channel2.id)
      )
      .map(channel => {
        const { changingName, ...newChannel } = channel;
        return newChannel;
      });

    dispatch(
      updateChannels({ addedChannels, updatedChannels, deletedChannels })
    );
  };

  const resetChanges = () => {
    setList(originalList);
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    let items = reorder(list, result.source.index, result.destination.index);

    items = items.map((item, index) => ({
      ...item,
      position: index + 1
    }));

    setList(items);
  };

  return (
    <div className="GuildSettingsChannels--container">
      <h3>GUILD CHANNELS</h3>
      <div>
        <p>{`${list.length} Channels`}</p>
        <div>
          <i
            className="fas fa-plus-square fa-lg"
            role="button"
            onClick={() =>
              setList([
                ...list,
                {
                  id: uuidv4(),
                  name: "new-channel",
                  position: list.length + 1,
                  changingName: false
                }
              ])
            }
          />
        </div>
      </div>
      <div className="GuildSettingsChannels--channelList">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {list.map((channel, index) => (
                  <Draggable
                    key={channel.id}
                    draggableId={channel.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="GuildSettingsChannels--channel"
                      >
                        <i
                          className="fas fa-bars fa-lg"
                          {...(list.length > 1
                            ? { ...provided.dragHandleProps }
                            : {})}
                        />
                        <div>
                          <i className="fas fa-hashtag fa-md" />
                          {channel.changingName ? (
                            <input
                              type="text"
                              autoFocus
                              maxLength={30}
                              value={channel.name}
                              onChange={e => {
                                if (e.target.value.length < 2) return;

                                setList([
                                  ...list.slice(0, index),
                                  {
                                    ...list[index],
                                    name: e.target.value
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")
                                  },
                                  ...list.slice(index + 1)
                                ]);
                              }}
                              onBlur={() => {
                                setList([
                                  ...list.slice(0, index),
                                  {
                                    ...list[index],
                                    changingName: false
                                  },
                                  ...list.slice(index + 1)
                                ]);
                              }}
                              onKeyDown={e => {
                                if (e.keyCode === 13) {
                                  setList([
                                    ...list.slice(0, index),
                                    {
                                      ...list[index],
                                      changingName: false
                                    },
                                    ...list.slice(index + 1)
                                  ]);
                                }
                              }}
                            />
                          ) : (
                            <p
                              onClick={() => {
                                setList([
                                  ...list.slice(0, index),
                                  {
                                    ...list[index],
                                    changingName: true
                                  },
                                  ...list.slice(index + 1)
                                ]);
                              }}
                            >
                              {channel.name}
                            </p>
                          )}
                        </div>
                        {list.length > 1 && (
                          <i
                            className="fas fa-trash-alt fa-lg"
                            role="button"
                            onClick={() => {
                              setList([
                                ...list.slice(0, index),
                                ...list.slice(index + 1).map(item => ({
                                  ...item,
                                  position: item.position - 1
                                }))
                              ]);
                            }}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {saveChangesOpen && (
        <SaveChangesBar
          closeHandler={() => setSaveChangesOpen(false)}
          requestClose={saveChangesRequestClose}
          requestCloseHandler={() => setSaveChangesRequestClose(false)}
          resetHandler={resetChanges}
          saveHandler={saveChanges}
          loading={apiLoading}
          error={apiError}
        />
      )}
    </div>
  );
}
