// const FormSectionRenderer = ({
//   formSection,
//   configCollection,
//   onChangeSectionConfig,
//   onMoveUp,
//   onMoveDown,
//   onMoveCriteriaUp,
//   onMoveCriteriaDown,
//   onRemove,
//   onAddCriteria,
//   onRemoveCriteria,
//   isFirst,
//   isLast,
// }: FormSectionRendererProps) => {
//   const [newCriteriaName, setNewCriteriaName] = useState("");

//   const handleAddCriteria = () => {
//     if (newCriteriaName.trim()) {
//       onAddCriteria(newCriteriaName);
//       setNewCriteriaName("");
//     }
//   };

//   return (
//     <Flex
//       flexDirection="column"
//       gap="16px"
//       border="1px solid"
//       borderColor="gray.300"
//       borderRadius="md"
//       padding="12px"
//       bg="white"
//     >
//       <Flex alignItems="center" justifyContent="space-between">
//         <Flex alignItems="center" gap="8px">
//           <Badge size="sm" colorPalette="purple">
//             {formSection.order}
//           </Badge>
//           <Text fontWeight="semibold" fontSize="sm">
//             {formSection.sectionTitle}
//           </Text>
//         </Flex>

//         <Flex gap="4px">
//           <Select.Root
//             collection={configCollection}
//             size="sm"
//             value={
//               formSection.defaultConfig?.configCode
//                 ? [formSection.defaultConfig.configCode]
//                 : []
//             }
//             onValueChange={(e) =>
//               onChangeSectionConfig(formSection.sectionId, e.value[0])
//             }
//           >
//             <Select.HiddenSelect />
//             <Select.Control>
//               <Select.Trigger>
//                 <Select.ValueText placeholder="Select config type" />
//               </Select.Trigger>
//               <Select.IndicatorGroup>
//                 <Select.Indicator />
//               </Select.IndicatorGroup>
//             </Select.Control>
//             <Portal>
//               <Select.Positioner>
//                 <Select.Content>
//                   {configCollection.items.map((config) => (
//                     <Select.Item item={config} key={config.value}>
//                       {config.label}
//                       <Select.ItemIndicator />
//                     </Select.Item>
//                   ))}
//                 </Select.Content>
//               </Select.Positioner>
//             </Portal>
//           </Select.Root>

//           <IconButton
//             size="xs"
//             variant="ghost"
//             onClick={onMoveUp}
//             disabled={isFirst}
//           >
//             <FaArrowUp />
//           </IconButton>
//           <IconButton
//             size="xs"
//             variant="ghost"
//             onClick={onMoveDown}
//             disabled={isLast}
//           >
//             <FaArrowDown />
//           </IconButton>
//           <IconButton
//             size="xs"
//             variant="ghost"
//             colorPalette="red"
//             onClick={onRemove}
//           >
//             <FaTrash />
//           </IconButton>
//         </Flex>
//       </Flex>

//       <Flex gap="16px" flexWrap="wrap">
//         {formSection.defaultConfig && (
//           <Flex gap="8px" alignItems="center" flexWrap="wrap">
//             <Text fontSize="xs" color="text.muted">
//               Type:
//             </Text>
//             <Badge size="sm" colorPalette="blue">
//               {formSection.defaultConfig.configType}
//             </Badge>
//           </Flex>
//         )}

//         {formSection.defaultConfig?.configRoleList &&
//           formSection.defaultConfig.configRoleList.length > 0 && (
//             <Flex gap="4px" alignItems="center" flexWrap="wrap">
//               <Text fontSize="xs" color="text.muted">
//                 Roles:
//               </Text>
//               {formSection.defaultConfig.configRoleList.map((role, idx) => (
//                 <Badge key={idx} size="sm" colorPalette="gray" variant="subtle">
//                   {role}
//                 </Badge>
//               ))}
//             </Flex>
//           )}
//       </Flex>

//       <Separator />

//       {formSection.defaultConfig?.configType === "COMMENT" &&
//         (formSection.defaultConfig?.configRoleList ?? []).map((role) => (
//           <Textarea key={role} as="textarea" size="sm" placeholder={role} />
//         ))}

//       {
//         formSection.defaultConfig?.configType === "TARGET" && "NOthing here yet"
//         // <Input as="textarea" size="sm" placeholder="Target / Objective input" />
//       }

//       {formSection.defaultConfig?.configType === "POINT" && (
//         <>
//           <Flex flexDirection="column" gap="8px">
//             {formSection.criteriaList?.length ? (
//               formSection.criteriaList.map((criteria, index) => (
//                 <SectionCriteriaRenderer
//                   key={criteria.criteriaId}
//                   sectionRoles={formSection.defaultConfig?.configRoleList ?? []}
//                   criteria={criteria}
//                   index={index}
//                   total={formSection.criteriaList!.length}
//                   onMoveUp={() => onMoveCriteriaUp(criteria.criteriaId)}
//                   onMoveDown={() => onMoveCriteriaDown(criteria.criteriaId)}
//                   onRemove={() => onRemoveCriteria(criteria.criteriaId)}
//                 />
//               ))
//             ) : (
//               <Text fontSize="sm" color="gray.500" textAlign="center">
//                 No criteria added yet
//               </Text>
//             )}
//           </Flex>

//           <Flex gap="8px">
//             <Input
//               size="sm"
//               placeholder="Enter criteria name..."
//               value={newCriteriaName}
//               onChange={(e) => setNewCriteriaName(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleAddCriteria();
//                 }
//               }}
//             />
//             <Button
//               size="sm"
//               colorPalette="blue"
//               onClick={handleAddCriteria}
//               disabled={!newCriteriaName.trim()}
//             >
//               <FaPlus /> Add
//             </Button>
//           </Flex>
//         </>
//       )}
//     </Flex>
//   );
// };
